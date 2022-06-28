import { PuppeteerInterface } from "App/Controllers/Service/Facebook/src/Interface";
const BUTTON_DOWN =
  "#navigation-button-down > .style-scope > .yt-simple-endpoint > #button > #button > .style-scope";
class Short {
  async getLink(page: PuppeteerInterface) {
    const currentUrl = () => {
      return window.location.href;
    };
    const href: string = await page.page.evaluate(currentUrl);
    return { href: href };
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
