const fetch = require("node-fetch");
const cheerio = require("cheerio");
const Sheet = require("./sheet");

async function scrapePage(i) {
  const res = await fetch(
    `https://explodingtopics.com/featured-topics-this-year?page=${i}`
  );
  const text = await res.text();
  const $ = cheerio.load(text);

 const containers = $(".topicInfoContainer").toArray();
 const trends = containers.map(c => {
   const active = $(c);
   const keyword = active.find('.tileKeyword').text();
   const description = active.find('.tileDescription').text();
   const searchesPerMonth = active.find('.scoreTag').first().text().split('mo')[1];
   return {keyword, description, searchesPerMonth}
  })
  return trends;
};


// Page Iteration
(async function () {
  
    let i = 1;
    let pages = [];
   
    while(true) {
       const newPage = await scrapePage(i);
       console.log('new row length', newPage.length);
        if (newPage.length !== 29) break;
        pages = pages.concat(newPage);
        i++;
        console.log(pages.length,'pages length');
    }

// Delete Previous Data?


console.log(pages.length, "total pages length");
const sheet = new Sheet();
await sheet.load();
 sheet.addRows(pages);
 
 
})();


// CHALLENGE 1 -> ITERATE THROUGH PAGES - PREVIOUS EXAMPLE
// CHALLENGE 2 -> DELETE PREVIOUS DATA BEFORE UPDATING WITH NEW
