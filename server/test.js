const fs = require("fs")
const axios = require("axios");
const cheerio = require("cheerio");

async function update() {
    const result = JSON.parse(await fs.readFileSync("./instaData.json"))

    

    await fs.writeFileSync("./instaDataNew.json", JSON.stringify(result, null, 2));
    console.log('Updated data:', result);
}

update()
