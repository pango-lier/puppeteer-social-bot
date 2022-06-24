import { PuppeteerInterface } from "App/Controllers/Service/Facebook/src/Interface";
import { random } from "App/Controllers/Service/utils";
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
    var count = 0;
    console.log(count);
    const currentUrl = () => {
      return window.location.href;
    };
    const links: string[] = [];
    const videos: any[] = [];
    const interval = setInterval(async () => {
      try {
        const href: string = await page.page.evaluate(currentUrl);
        // console.log(`${count} current URL is: ${href}`);
        count++;
        // await page.page.mouse.wheel({ deltaY: 250 * count });
        if (random(0, 10) === 1) {
          await page.page.click(BUTTON_DOWN);
        }
        if (!links.includes(href)) {
          links.push(href);
          if (enableDowload) {
            const video = await YoutubeDl.dowload(href + "'");
            videos.push(video);
          }
        }
      } catch (e) {
        console.log(e?.message);
      }
    }, intervalCLick);

    await page.func.delay(time);
    await clearInterval(interval);
    return { links, videos };
  }
  async downloadVideoAuto(page: PuppeteerInterface) {
    await Youtube.Login.goto(page);
    await Youtube.Login.gotoShort(page);
    return await this.getLinks(page, {
      time: 20,
      intervalCLick: 600,
      enableDowload: true,
    });
  }
}
export default Short;
