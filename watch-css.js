#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const cssnano = require("cssnano");

const inputFile = path.join(__dirname, "starterOnly", "main.css");
const outputFile = path.join(__dirname, "starterOnly", "main.min.css");

function minifyCSS() {
  fs.readFile(inputFile, "utf8", (err, data) => {
    if (err) {
      console.error(`❌ Erreur: ${err.message}`);
      return;
    }

    postcss([cssnano()])
      .process(data, { from: inputFile, to: outputFile })
      .then((result) => {
        fs.writeFile(outputFile, result.css, "utf8", (writeErr) => {
          if (writeErr) {
            console.error(`❌ Erreur d'écriture: ${writeErr.message}`);
            return;
          }
          const minifiedSize = (
            Buffer.byteLength(result.css, "utf8") / 1024
          ).toFixed(2);
          console.log(
            `✅ [${new Date().toLocaleTimeString()}] CSS minifié (${minifiedSize} KB)`
          );
        });
      })
      .catch((processErr) => {
        console.error(`❌ Erreur PostCSS: ${processErr.message}`);
      });
  });
}

// Initial minification
console.log("👀 Surveillance du fichier main.css...");
minifyCSS();

// Watch for changes
fs.watch(inputFile, (eventType) => {
  if (eventType === "change") {
    minifyCSS();
  }
});

console.log("⏳ En attente des modifications... (Ctrl+C pour arrêter)");
