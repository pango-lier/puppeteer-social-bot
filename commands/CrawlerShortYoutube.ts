import { BaseCommand } from "@adonisjs/core/build/standalone";
import { PuppeteerInterface } from "App/Controllers/Service/Facebook/src/Interface";
import BrowserProfile from "App/Controllers/Service/Puppeteer/BrowserProfile";
import { random } from "App/Controllers/Service/utils";
import Youtube from "App/Controllers/Service/Youtube";
import Crawler from "App/Models/Crawler";
import CrawlerUrl from "App/Models/CrawlerUrl";

export default class CrawlerShortYoutube extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = "crawler:short_youtube";

  /**
   * Command description is displayed in the "help" output
   */
  public static description = "";

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: true,
  };

  public async run() {
    const pup: PuppeteerInterface = await BrowserProfile.StartUp();
    const crawler = await Crawler.find(1);
    if (crawler?.type === "youtube-short") {
      this.crawlerYoutubeShort(pup, crawler);
    }
  }

  public async crawlerYoutubeShort(
    pup: PuppeteerInterface,
    crawler: Crawler | null
  ) {
    await Youtube.Login.goto(pup);
    await Youtube.Login.gotoShort(pup);
    let offset = 30;
    while (1) {
      console.log(offset-30);
      try{
      await pup.func.delay(random(3, 15));
      const link = await Youtube.Short.getLink(pup, { offset });
      offset++;
      await Youtube.Short.clickBtnDown(pup);
      const crawlerUrl = {
        url: link.href,
        crawler_id: crawler?.id,
        content: link.content,
      };
      await CrawlerUrl.updateOrCreate({ url: link.href }, crawlerUrl);
    }catch(e){
      console.log(e?.message);
    }
    }
  }
}
