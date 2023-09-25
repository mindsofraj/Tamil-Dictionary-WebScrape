const puppeteer = require("puppeteer");

async function scrapeWordMeaning(word) {
  const browser = await puppeteer.launch({ headless: "new" });

  const page = await browser.newPage();

  const url = `https://www.tamildict.com/english.php?action=search&word=${word}`;

  await page.goto(url);

  const meaning = await page.evaluate(() => {
    // const meaningElement = document.querySelector(
    //   ".ud_box2 + table tbody tr:nth-of-type(3) td:nth-of-type(2)"
    // );

    const meaningElement = document.querySelectorAll(
      ".ud_box2 + table tbody tr"
    );
    let word = [];
    let meaning = [];
    for (let i = 2; i <= meaningElement.length - 2; i++) {
      word.push(meaningElement[i].querySelectorAll("td")[0].textContent);
      meaning.push(meaningElement[i].querySelectorAll("td")[1].textContent);
    }

    return meaningElement ? [word, meaning] : null;
  });
  await browser.close();

  return meaning;
}

module.exports = scrapeWordMeaning;
