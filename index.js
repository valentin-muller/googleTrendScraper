const fetch = require('node-fetch');
const cheerio = require('cheerio')


(async function () {
    const res = await fetch(
      "https://explodingtopics.com/featured-topics-this-year"
    );
    const text = await res.text();
    const $ = cheerio.load(text);

    
    console.log({text});
    
})();