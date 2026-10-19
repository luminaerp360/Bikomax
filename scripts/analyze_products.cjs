const fs = require('fs');
const products = JSON.parse(fs.readFileSync('C:/Users/Hp/Documents/GitHub/Bikomax/scripts/parsed_pos_products.json', 'utf-8'));

console.log('Total products:', products.length);

const list = products.map((p, i) => {
  return `${i+1}. [${p.referenceNumber}] "${p.name}" | Price: ${p.price} | BulkPrice: ${p.bulkPrice} | QtyPerBulk: ${p.QuantityPerBulk} | UOM: ${p.uom} | CatId: ${p.categoryId} | Desc: "${(p.description || '').replace(/\n/g, ' ')}"`;
});

fs.writeFileSync('C:/Users/Hp/Documents/GitHub/Bikomax/scripts/products_list.txt', list.join('\n'), 'utf-8');
console.log('Saved product list to scripts/products_list.txt');
