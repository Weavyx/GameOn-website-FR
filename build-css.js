#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const cssnano = require("cssnano");

const inputFile = path.join(__dirname, "starterOnly", "main.css");
const outputFile = path.join(__dirname, "starterOnly", "main.min.css");

// Read the CSS file
fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    console.error(`❌ Erreur lors de la lecture du fichier: ${err.message}`);
    process.exit(1);
  }

  // Process with PostCSS and cssnano
  postcss([cssnano()])
    .process(data, { from: inputFile, to: outputFile })
    .then((result) => {
      // Write the minified CSS
      fs.writeFile(outputFile, result.css, "utf8", (writeErr) => {
        if (writeErr) {
          console.error(
            `❌ Erreur lors de l'écriture du fichier: ${writeErr.message}`
          );
          process.exit(1);
        }

        // Get file sizes
        const originalSize = Buffer.byteLength(data, "utf8");
        const minifiedSize = Buffer.byteLength(result.css, "utf8");
        const reduction = (
          ((originalSize - minifiedSize) / originalSize) *
          100
        ).toFixed(2);

        console.log(`✅ CSS minifié avec succès!`);
        console.log(`📁 Entrée: ${inputFile}`);
        console.log(`📁 Sortie: ${outputFile}`);
        console.log(
          `📊 Taille originale: ${(originalSize / 1024).toFixed(2)} KB`
        );
        console.log(
          `📊 Taille minifiée: ${(minifiedSize / 1024).toFixed(2)} KB`
        );
        console.log(`📉 Réduction: ${reduction}%`);
      });
    })
    .catch((processErr) => {
      console.error(
        `❌ Erreur lors du traitement PostCSS: ${processErr.message}`
      );
      process.exit(1);
    });
});
