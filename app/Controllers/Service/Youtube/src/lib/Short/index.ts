import { PuppeteerInterface } from "Contracts/Social";

const BUTTON_DOWN =
  "#navigation-button-down > .style-scope > .yt-simple-endpoint > #button > #button > .style-scope";
class Short {
  async getLink(page: PuppeteerInterface, options: { offset: number }) {
    const currentUrl = () => {
      return window.location.href;
    };
    const currentContent = (options) => {
      const element = document.querySelector(
        `#\\${options.offset} > .overlay > .style-scope > #overlay > .style-scope > .title > .style-scope`
      );
      if (element) {
        return element.textContent;
      }
      return null;
    };
    const href: string = await page.page.evaluate(currentUrl);
    const content: string | null = await page.page.evaluate(
      currentContent,
      options
    );
    return { href: href, content: content };
  }
  async clickBtnDown(page: PuppeteerInterface) {
    await page.page.click(BUTTON_DOWN);
  }
  async downloadVideoAuto(page: PuppeteerInterface) {
    // await Youtube.Login.goto(page);
    // await Youtube.Login.gotoShort(page);
    // const link = await this.getLink(page);
    // await this.clickBtnDown(page);
    // await page.func.delay(random(2,15));
  }
}
export default Short;
