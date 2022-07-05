import { PuppeteerInterface } from "Contracts/Social";
import puppeteer, { Browser } from "puppeteer";
import { PuppeteerActionFunc } from "./PuppeteerActionFunc";
class BrowserProfile {
  async StartUp(): Promise<PuppeteerInterface> {
    const browser = await this.start();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 937 });
    const func = new PuppeteerActionFunc(page);
    return { browser, func, page };
  }

  async start(): Promise<Browser> {
    return await puppeteer.launch({
      headless: true,
      // executablePath: process.env.CHROME_BIN,
      args: [
        "--no-sandbox",
        // "--headless",
        // "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-backgrounding-occluded-windows",
        "--disable-backing-store-limit",
      ],
    });
  }

  async stop(browser: Browser) {
    return await browser.close();
  }
}

export default new BrowserProfile();
