import puppeteer, { Browser } from "puppeteer";
import { PuppeteerInterface } from "../Interface";
import { PuppeteerActionFunc } from "./actionFunc";
class BrowserProfile {
  async StartUp(): Promise<PuppeteerInterface> {
    const browser = await this.start();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 937 });
    const func = new PuppeteerActionFunc(page);
    return { browser, func, page };
  }

  async start(): Promise<Browser> {
    return await puppeteer.launch({ headless: false });
  }

  async stop(browser: Browser) {
    return await browser.close();
  }
}

export default new BrowserProfile();
