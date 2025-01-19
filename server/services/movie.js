import puppeteer from 'puppeteer';

export async function searchMovie(text) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36")
  await page.goto("https://search.douban.com/movie/subject_search?search_text=" + text)
  const listEl = await page.$$('div > .item-root');
  const list = []
  for (const i in listEl) {
    let title = await listEl[i].$eval('.title', el => el?.textContent)
    title = title.replace('[可播放]', '')
    list.push({
      cover: await listEl[i].$eval('img', el => el?.src),
      link: await listEl[i].$eval('.cover-link', el => el?.href),
      title: title,
      rate: await listEl[i].$eval('.rating', el => el?.textContent),
      meta: await listEl[i].$eval('.meta,.abstract', el => el?.textContent),
    })
  }

  return list
}