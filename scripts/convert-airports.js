import fs from 'fs';
import path from 'path';

const inputPath = 'data/airports.dat';
const outputPath = 'data/airports.json';

try {
  const data = fs.readFileSync(inputPath, 'utf8');
  const lines = data.split('
');
  const airports = [];

  for (const line of lines) {
    if (!line.trim()) continue;

    // OpenFlights DAT format uses commas but some fields are quoted and contain commas
    // This is a simple regex to split by comma while ignoring commas inside quotes
    const parts = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
    
    if (!parts || parts.length < 5) continue;

    // Remove quotes
    const name = parts[1].replace(/^"|"$/g, '');
    const city = parts[2].replace(/^"|"$/g, '');
    const country = parts[3].replace(/^"|"$/g, '');
    const iata = parts[4].replace(/^"|"$/g, '');

    // Only include if it has a valid IATA code
    if (iata && iata !== '\N' && iata.length === 3) {
      airports.push({
        id: iata, // Use IATA as ID
        name,
        city,
        country,
        iata
      });
    }
  }

  fs.writeFileSync(outputPath, JSON.stringify(airports));
  console.log(`Successfully converted ${airports.length} airports to JSON.`);
} catch (err) {
  console.error('Error processing airports.dat:', err);
}
