import { BaseCommand } from "@adonisjs/core/build/standalone";
import Facebook from "App/Controllers/Service/Facebook";
import { IFanpage } from "App/Controllers/Service/Facebook/src/Interface";

import BrowserProfile from "App/Controllers/Service/Puppeteer/BrowserProfile";
import { random } from "App/Controllers/Service/utils";
import YoutubeDl from "App/Controllers/Service/Youtube/src/lib/YoutubeDl";
import Account from "App/Models/Account";
import Article from "App/Models/Article";
import CrawlerUrl from "App/Models/CrawlerUrl";
import Target from "App/Models/Target";
import { IProfile, PuppeteerInterface } from "Contracts/Social";

export default class PostArticleFanpageFacebook extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = "post:article_fanpage_facebook";

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
    const target = await Target.find(1);
    if (target?.type === "facebook-fanpage") {
      const account = await Account.find(target?.account_id);
      if (account?.user_name && account?.password) {
        const profile: IProfile = {
          userName: account?.user_name,
          password: account?.password,
        };
        await Facebook.Login.login(pup.func, profile);
        await Facebook.FanPage.goto(pup, target.url);
        const crawlers = await CrawlerUrl.query().where("id", ">", 384);
        const fanPage: IFanpage = {
          content: "",
          images: [],
          download: false,
          type: "video",
        };
        for (const crawlerUrl of crawlers) {
          try {
            console.log(crawlerUrl.id + "--" + crawlerUrl.url);
            const youtube = await YoutubeDl.download({ url: crawlerUrl.url });
            await pup.func.delay(random(3, 5));
            if (youtube.bestUrl) {
              fanPage.images = [youtube.bestUrl];
              fanPage.content = `TikTok #reels #watch #shorts #video #youtube #pango`; //${youtube.description}
              await Facebook.FanPage.publishContent(pup, fanPage);
              await Article.create({
                crawler_url_id: crawlerUrl.id,
                target_id: target.id,
                content: fanPage.content,
                name: "youtube-short",
              });
              await pup.func.delay(random(40, 60));
            }
          } catch (e) {
            console.log(e.message);
            await Facebook.Login.goto(pup.func);
            await pup.func.delay(2);
            await Facebook.FanPage.goto(pup, target.url);
          }
        }
      }
    }
  }
}
