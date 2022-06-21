import { PuppeteerInterface } from "App/Controllers/Service/Facebook/src/Interface";
import Youtube from "../../..";
import { dowload } from "../YoutubeDl";

class Short {
  async dowloadVideo(page: PuppeteerInterface) {
    await Youtube.Login.goto(page);
    await Youtube.Login.gotoShort(page);
    await page.page.exposeFunction("onHashChange", (url) =>
      page.page.emit("hashchange", url)
    );
    await page.page.evaluateOnNewDocument(() => {
      addEventListener("hashchange", (e) => {
        console.log(location.href);
      });
    });

    // Listen for hashchange events in node Puppeteer code.
    page.page.on("hashchange", (url) => console.log("hashchange event:", url));
    // const url = "https://www.youtube.com/shorts/gPz-eLT8RIw" + "'";
    // await dowload(url);
  }
}
export default Short;
