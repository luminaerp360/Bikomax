const fs = require('fs');

const text = fs.readFileSync('C:/Users/Hp/Documents/GitHub/Bikomax/scripts/raw_text.txt', 'utf-8');

// Find the last complete product closing brace: "},"
const lastCompleteIdx = text.lastIndexOf('},');
if (lastCompleteIdx !== -1) {
  const validJson = text.substring(0, lastCompleteIdx + 1) + '\n  ]\n}';
  try {
    const parsed = JSON.parse(validJson);
    console.log('Successfully parsed products! Count:', parsed.data.length);
    fs.writeFileSync('C:/Users/Hp/Documents/GitHub/Bikomax/scripts/parsed_pos_products.json', JSON.stringify(parsed.data, null, 2), 'utf-8');
    
    // Print a summary of names and categories
    const summary = parsed.data.map((p, idx) => ({
      idx: idx + 1,
      id: p._id,
      ref: p.referenceNumber,
      name: p.name,
      price: p.price,
      uom: p.uom,
      qtyPerBulk: p.QuantityPerBulk,
      bulkPrice: p.bulkPrice,
      desc: p.description
    }));
    console.log('Sample of items:', summary.slice(0, 10));
    console.log('Total items parsed:', summary.length);
  } catch (err) {
    console.error('Error parsing JSON:', err.message);
  }
} else {
  console.log('Could not find last },');
}
