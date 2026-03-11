const fs = require('fs');
const inputPath = 'data/airports.dat';
const outputPath = 'data/airports.json';
try {
  const data = fs.readFileSync(inputPath, 'utf8');
  const lines = data.split(/\r?\n/);
  const airports = [];
  for (let line of lines) {
    if (!line.trim()) continue;
    const parts = line.split(',');
    if (parts.length < 5) continue;
    const name = parts[1].replace(/"/g, '');
    const city = parts[2].replace(/"/g, '');
    const country = parts[3].replace(/"/g, '');
    const iata = parts[4].replace(/"/g, '');
    if (iata && iata !== '\\N' && iata.length === 3) {
      airports.push({ id: iata, name, city, country, iata });
    }
  }
  fs.writeFileSync(outputPath, JSON.stringify(airports));
  console.log('Successfully converted');
} catch (err) {
  console.error(err);
}
