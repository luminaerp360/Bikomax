const fs = require('fs');

const productsTs = fs.readFileSync('c:/Users/Hp/Documents/GitHub/Bikomax/src/data/products.ts', 'utf-8');

const startIdx = productsTs.indexOf('export const INITIAL_PRODUCTS: Product[] = [');
const endIdx = productsTs.indexOf('export const KENYA_DELIVERY_ZONES');
const rawArray = productsTs.substring(startIdx + 43, productsTs.lastIndexOf('];', endIdx) + 1).trim();

const scriptContent = `/**
 * Seed script for Bikomax Architectural Finishes
 * Run with: node scripts/seed_bikomax.js
 */
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce';
const TENANT_ID = 'bikomax';

const PRODUCTS = ${rawArray};

async function seed() {
  console.log('Connecting to MongoDB at:', MONGODB_URI);
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;

  const tenantsCol = db.collection('tenants');
  const categoriesCol = db.collection('categories');
  const settingsCol = db.collection('settings');
  const productsCol = db.collection('products');

  // 1. Ensure Bikomax Tenant Record
  const existingTenant = await tenantsCol.findOne({ tenantId: TENANT_ID });
  if (existingTenant) {
    console.log('Tenant already exists:', TENANT_ID);
  } else {
    await tenantsCol.insertOne({
      tenantId: TENANT_ID,
      name: 'Bikomax Architectural Supplies Ltd',
      description: 'Luxury tiles, sanitaryware, and electrical finishes showroom',
      status: 'active',
      ownerEmail: 'orders@bikomax.co.ke',
      plan: 'enterprise',
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('Created tenant:', TENANT_ID);
  }

  // 2. Ensure Categories
  const categoryDefs = [
    { name: 'Tiles', description: 'Architectural porcelain, ceramic, and marble floor and wall tiles' },
    { name: 'Sanitaryware', description: 'European luxury sanitaryware, basins, mixers, and toilets' },
    { name: 'Electrical', description: 'British standard switches, tempered glass sockets, and accessories' }
  ];

  for (const cat of categoryDefs) {
    const existing = await categoriesCol.findOne({ tenantId: TENANT_ID, name: cat.name });
    if (!existing) {
      await categoriesCol.insertOne({
        tenantId: TENANT_ID,
        name: cat.name,
        description: cat.description,
        isActive: true,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('Created category:', cat.name);
    }
  }

  // 3. Ensure Store Settings
  const existingSetting = await settingsCol.findOne({ tenantId: TENANT_ID });
  const settingPayload = {
    tenantId: TENANT_ID,
    general: {
      storeName: 'BIKOMAX ARCHITECTURAL SUPPLIES LTD',
      storeTagline: 'Flawless • Functional • Refined',
      supportEmail: 'orders@bikomax.co.ke',
      supportPhone: '+254 720 230 859',
      storeAddress: "Unit G48, Rupa's Godowns, Eldoret, Kenya",
      currency: 'KES',
      currencySymbol: 'KES',
      taxRate: 16,
      taxInclusive: true
    },
    social: {
      whatsapp: '254720230859'
    },
    isDeleted: false,
    updatedAt: new Date()
  };

  if (existingSetting) {
    await settingsCol.updateOne({ tenantId: TENANT_ID }, { $set: settingPayload });
    console.log('Updated settings for Bikomax');
  } else {
    settingPayload.createdAt = new Date();
    await settingsCol.insertOne(settingPayload);
    console.log('Created settings for Bikomax');
  }

  // 4. Seed Products
  console.log('Seeding products...');
  for (const p of PRODUCTS) {
    const filter = { tenantId: TENANT_ID, itemNo: p.ref };
    const doc = {
      tenantId: TENANT_ID,
      name: p.name,
      itemNo: p.ref,
      sku: p.ref,
      description: p.description,
      categories: [p.category],
      images: [p.image],
      price: p.pricing_type === 'area' ? (p.price_per_sqm || 0) : (p.price_per_unit || 0),
      pricingType: p.pricing_type,
      pricePerSqm: p.price_per_sqm,
      sqmPerBox: p.sqm_per_box,
      bulkPricePerBox: p.bulk_price_per_box,
      bulkUnit: p.bulk_unit || (p.pricing_type === 'area' ? 'Box' : 'Piece'),
      dimension: p.dimension,
      thickness: p.thickness,
      finish: p.finish,
      material: p.material,
      origin: p.origin,
      collectionName: p.collection,
      look: p.look,
      technology: p.technology,
      surfaceType: p.surfaceType,
      destinations: p.destinations || [],
      specs: p.specs || [],
      featured: !!p.featured,
      isActive: true,
      brand: 'Bikomax Architectural',
      isDeleted: false,
      updatedAt: new Date()
    };

    const existingProduct = await productsCol.findOne(filter);
    if (existingProduct) {
      await productsCol.updateOne(filter, { $set: doc });
    } else {
      doc.createdAt = new Date();
      await productsCol.insertOne(doc);
    }
  }

  console.log(\`Successfully seeded \${PRODUCTS.length} products for tenant: \${TENANT_ID}\`);
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
`;

fs.writeFileSync('C:/Users/Hp/Desktop/stockify/eccomerse-admi-portal/e-commerce-backend/scripts/seed_bikomax.js', scriptContent, 'utf-8');
console.log('Wrote seed_bikomax.js successfully!');
