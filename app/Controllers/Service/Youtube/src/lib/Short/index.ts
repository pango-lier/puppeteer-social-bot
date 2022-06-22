import { PuppeteerInterface } from "App/Controllers/Service/Facebook/src/Interface";
import { random } from "App/Controllers/Service/Facebook/src/utils";
import Youtube from "../../..";
import YoutubeDl from "../YoutubeDl";

const BUTTON_DOWN =
  "#navigation-button-down > .style-scope > .yt-simple-endpoint > #button > #button > .style-scope";
class Short {
  async getLinks(
    page: PuppeteerInterface,
    {
      time = 100,
      intervalCLick = 400,
      enableDowload = false,
    }: { time: number; intervalCLick: number; enableDowload: boolean }
  ) {
    let count = 0;
    const currentUrl = () => {
      return window.location.href;
    };
    const links: string[] = [];

    const interval = setInterval(async () => {
      const href: string = await page.page.evaluate(currentUrl);
      // console.log(`${count} current URL is: ${href}`);
      count++;
      // await page.page.mouse.wheel({ deltaY: 250 * count });
      if (random(0, 10) === 1) {
        await page.page.click(BUTTON_DOWN);
      }
      if (!links.includes(href)) {
        links.push(href);
        if (enableDowload) YoutubeDl.dowload(href + "'");
      }
    }, intervalCLick);

    await page.func.delay(time);
    await clearInterval(interval);
    return links;
  }
  async dowloadVideo(page: PuppeteerInterface) {
    await Youtube.Login.goto(page);
    await Youtube.Login.gotoShort(page);
    const links = await this.getLinks(page, {
      time: 100,
      intervalCLick: 400,
      enableDowload: true,
    });
    // for (const url of links) {
    //   dowload(url + "'");
    // }
    // const url = "https://www.youtube.com/shorts/gPz-eLT8RIw" + "'";
    //
  }
}
export default Short;
