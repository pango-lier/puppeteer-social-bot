import { PuppeteerInterface } from "App/Controllers/Service/Facebook/src/Interface";
import { random } from "App/Controllers/Service/Facebook/src/utils";
import Youtube from "../../..";
import { dowload } from "../YoutubeDl";

class Short {
  async dowloadVideo(page: PuppeteerInterface) {
    await Youtube.Login.goto(page);
    await Youtube.Login.gotoShort(page);
    let count = 0;
    const currentUrl = () => {
      return window.location.href;
    };
    const links: string[] = [];

    const interval = setInterval(async () => {
      const href: string = await page.page.evaluate(currentUrl);
      console.log(`${count} current URL is: ${href}`);
      count++;
      // await page.page.mouse.wheel({ deltaY: 250 * count });
      if (random(0, 10) === 1) {
        await page.page.click(
          "#navigation-button-down > .style-scope > .yt-simple-endpoint > #button > #button > .style-scope"
        );
      }
      if (!links.includes(href)) {
        links.push(href);
      }
    }, 400);

    await page.func.delay(100);
    console.log(links);
    await clearInterval(interval);
    // const url = "https://www.youtube.com/shorts/gPz-eLT8RIw" + "'";
    // await dowload(url);
  }
}
export default Short;
