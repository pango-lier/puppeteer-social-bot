import Account from "App/Models/Account";
import Article from "App/Models/Article";
import CrawlerUrl from "App/Models/CrawlerUrl";
import Target from "App/Models/Target";
import { IProfile, PuppeteerInterface } from "Contracts/Social";
import Facebook from "../../Facebook";
import { IFanpage } from "../../Facebook/src/Interface";
import BrowserProfile from "../../Puppeteer/BrowserProfile";
import { random } from "../../utils";
import YoutubeDl from "../../Youtube/src/lib/YoutubeDl";

export const AutoGetShortYoutubePostFacebook = async (target: Target) => {

  const pup: PuppeteerInterface = await BrowserProfile.StartUp();
  if (target?.type !== "facebook-fanpage") throw new Error("Target must be facebook-fanpage .");
  const account = await Account.find(target?.account_id);
  if (!(account?.user_name && account?.password)) throw new Error("Username or password failed .");
  const profile: IProfile = {
    userName: account?.user_name,
    password: account?.password,
  };
  await Facebook.Login.login(pup.func, profile);
  await Facebook.FanPage.goto(pup, target.url);
  const crawlers = await CrawlerUrl.query().leftOuterJoin('articles', 'articles.crawler_url_id', '=', 'crawler_urls.id').select('crawler_urls.*');
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
