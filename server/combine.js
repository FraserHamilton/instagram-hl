const fs = require("fs");
async function update() {
  const dataBefore = JSON.parse(await fs.readFileSync("./instaData.json"));
  const scrapedData = JSON.parse(await fs.readFileSync("./instaScraped.json"));

  const modifiedScrapedData = scrapedData.map((d) => ({
    ...d,
    name: d.url.split("/").pop(),
  }));

  const combinedData = dataBefore.map(beforeItem => {
    const matchingScraped = modifiedScrapedData.find(
      scraped => scraped.name === beforeItem.instagram
    );
    return {
      ...beforeItem,
      url: matchingScraped?.url || '',
      followers: matchingScraped?.Followers || ''
    };
  });

  const final = combinedData.map(d => ({...d, followers: parseInt(d.followers.replaceAll(',', ''))}))

  console.log('modifiedScrapedData', final[0])

  // "url": "https://socialblade.com/instagram/user/billieeilish"

  await fs.writeFileSync("./instaDataNew.json", JSON.stringify(final, null, 2));
  //   console.log("Updated data:", result);
}

update();
