const fs = require('fs');

const API_BASE = 'https://ecommerse.lumina360.tech';
const TENANT_ID = 'bikomax';

const enrichedProducts = JSON.parse(fs.readFileSync('./scripts/bikomax_enriched_products.json', 'utf-8'));

async function syncCatalog() {
  console.log(`Starting live synchronization for tenant: ${TENANT_ID} (${enrichedProducts.length} items)...`);

  // 1. Fetch current live products
  console.log('Fetching existing products from live backend...');
  const res = await fetch(`${API_BASE}/products`, {
    headers: { 'x-tenant-id': TENANT_ID }
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch live products: ${res.status} ${res.statusText}`);
  }
  const existingProducts = await res.json();
  console.log(`Found ${existingProducts.length} existing products in database.`);

  // Index existing by sku / itemNo
  const existingBySku = new Map();
  for (const p of existingProducts) {
    if (p.sku) existingBySku.set(p.sku.trim(), p);
    if (p.itemNo) existingBySku.set(p.itemNo.trim(), p);
  }

  let createdCount = 0;
  let updatedCount = 0;
  let failedCount = 0;

  for (let i = 0; i < enrichedProducts.length; i++) {
    const item = enrichedProducts[i];
    const existing = existingBySku.get(item.ref);

    const payload = {
      name: item.name,
      itemNo: item.ref,
      sku: item.ref,
      description: item.description,
      categories: item.categories,
      images: item.images,
      price: item.price,
      pricingType: item.pricingType,
      pricePerSqm: item.pricePerSqm,
      sqmPerBox: item.sqmPerBox,
      bulkPricePerBox: item.bulkPricePerBox,
      bulkUnit: item.bulkUnit,
      dimension: item.dimension,
      thickness: item.thickness,
      finish: item.finish,
      material: item.material,
      origin: item.origin,
      look: item.look,
      specs: item.specs,
      featured: item.featured,
      isActive: true,
      brand: item.brand,
      stockQuantity: item.stockQuantity,
      hasBulkPricing: !!item.bulkPricePerBox
    };

    try {
      if (existing) {
        // Update existing
        const updateRes = await fetch(`${API_BASE}/products/${existing.id || existing._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-tenant-id': TENANT_ID
          },
          body: JSON.stringify(payload)
        });
        if (!updateRes.ok) {
          const errText = await updateRes.text();
          console.error(`[${i + 1}/${enrichedProducts.length}] Failed to update ${item.ref}:`, errText);
          failedCount++;
        } else {
          updatedCount++;
          if (updatedCount % 20 === 0 || i === enrichedProducts.length - 1) {
            console.log(`[${i + 1}/${enrichedProducts.length}] Updated ${item.name} (${item.ref})`);
          }
        }
      } else {
        // Create new
        const createRes = await fetch(`${API_BASE}/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-tenant-id': TENANT_ID
          },
          body: JSON.stringify(payload)
        });
        if (!createRes.ok) {
          const errText = await createRes.text();
          console.error(`[${i + 1}/${enrichedProducts.length}] Failed to create ${item.ref}:`, errText);
          failedCount++;
        } else {
          createdCount++;
          if (createdCount % 20 === 0 || i === enrichedProducts.length - 1) {
            console.log(`[${i + 1}/${enrichedProducts.length}] Created ${item.name} (${item.ref})`);
          }
        }
      }
    } catch (err) {
      console.error(`Error processing ${item.ref}:`, err.message);
      failedCount++;
    }

    // Small delay to prevent rate-limiting
    await new Promise(r => setTimeout(r, 60));
  }

  console.log(`\n=== Live Synchronization Completed ===`);
  console.log(`Created: ${createdCount}`);
  console.log(`Updated: ${updatedCount}`);
  console.log(`Failed: ${failedCount}`);
  console.log(`Total Products Now in Catalog: ${existingProducts.length + createdCount}`);

  // 2. Generate local & backend Docker MongoDB seed script
  generateDockerSeedScript(enrichedProducts);
}

function generateDockerSeedScript(products) {
  const seedScriptContent = `/**
 * Complete Bikomax Architectural Catalog Seed Script
 * Generated automatically from POS inventory
 * Run on server: node scripts/seed_bikomax.js
 */
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce';
const TENANT_ID = 'bikomax';

const PRODUCTS = ${JSON.stringify(products, null, 2)};

async function seed() {
  console.log('Connecting to MongoDB at:', MONGODB_URI);
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;

  const tenantsCol = db.collection('tenants');
  const categoriesCol = db.collection('categories');
  const settingsCol = db.collection('settings');
  const productsCol = db.collection('products');

  // 1. Tenant
  const existingTenant = await tenantsCol.findOne({ tenantId: TENANT_ID });
  if (!existingTenant) {
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

  // 2. Categories
  const categoryDefs = [
    { name: 'Tiles', description: 'Architectural porcelain, ceramic, sintered slabs, and wall coverings' },
    { name: 'Sanitaryware', description: 'European luxury sanitaryware, basins, mixers, showers, and accessories' },
    { name: 'Electrical', description: 'British standard tempered glass switches, sockets, and smart controls' }
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

  // 3. Products
  console.log(\`Seeding \${PRODUCTS.length} products...\`);
  let inserted = 0;
  let updated = 0;

  for (const p of PRODUCTS) {
    const filter = { tenantId: TENANT_ID, itemNo: p.ref };
    const doc = {
      tenantId: TENANT_ID,
      name: p.name,
      itemNo: p.ref,
      sku: p.ref,
      description: p.description,
      categories: p.categories,
      images: p.images,
      price: p.price,
      pricingType: p.pricingType,
      pricePerSqm: p.pricePerSqm,
      sqmPerBox: p.sqmPerBox,
      bulkPricePerBox: p.bulkPricePerBox,
      bulkUnit: p.bulkUnit,
      dimension: p.dimension,
      thickness: p.thickness,
      finish: p.finish,
      material: p.material,
      origin: p.origin,
      look: p.look,
      specs: p.specs,
      featured: !!p.featured,
      isActive: true,
      brand: 'Bikomax Architectural',
      stockQuantity: p.stockQuantity,
      hasBulkPricing: !!p.bulkPricePerBox,
      isDeleted: false,
      updatedAt: new Date()
    };

    const existingProduct = await productsCol.findOne(filter);
    if (existingProduct) {
      await productsCol.updateOne(filter, { $set: doc });
      updated++;
    } else {
      doc.createdAt = new Date();
      await productsCol.insertOne(doc);
      inserted++;
    }
  }

  console.log(\`Successfully seeded Bikomax products: \${inserted} created, \${updated} updated.\`);
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
`;

  // Write to local scripts
  fs.writeFileSync('./scripts/seed_full_bikomax.js', seedScriptContent, 'utf-8');
  console.log('Wrote local ./scripts/seed_full_bikomax.js');

  // Write to backend repo
  const backendPath = 'C:/Users/Hp/Desktop/stockify/eccomerse-admi-portal/e-commerce-backend/scripts/seed_bikomax.js';
  try {
    if (fs.existsSync('C:/Users/Hp/Desktop/stockify/eccomerse-admi-portal/e-commerce-backend/scripts')) {
      fs.writeFileSync(backendPath, seedScriptContent, 'utf-8');
      console.log(`Updated backend repo seed script: ${backendPath}`);
    }
  } catch (err) {
    console.warn('Could not write to backend path directly:', err.message);
  }
}

syncCatalog().catch(err => {
  console.error('Fatal sync error:', err);
  process.exit(1);
});
