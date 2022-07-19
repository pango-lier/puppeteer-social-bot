import Article from "App/Models/Article";
import Crawler from "App/Models/Crawler";
import CrawlerUrl from "App/Models/CrawlerUrl";
import Target from "App/Models/Target"
import Facebook from "../../Facebook"
import { IFanpage } from "../../Facebook/src/Interface";
import YoutubeDl from "../../Youtube/src/lib/YoutubeDl";

export const PostVideoLinkYoutubeFacebook = async (options: { url: string, description: string, tags: string }, crawler: Crawler, target: Target) => {

  const { url, description, tags } = options;
  console.log('start download video');
  const youtube = await YoutubeDl.download({ url });
  const crawlerUrl = await CrawlerUrl.updateOrCreate({ url: url }, {
    url: url,
    crawler_id: crawler.id,
    content: youtube.description,
  });
  if (youtube.bestUrl) {
    // const target = await Target.find(2);
    if (!target) throw new Error('target not found .');
    console.log('end download video');
    const pup = await Facebook.Hook.login(target);
    const fanPage: IFanpage = {
      content: "",
      images: [],
      download: false,
      type: "video",
    };

    fanPage.images = [youtube.bestUrl];
    fanPage.content = `${description} ${youtube.description} #watch #youtube #pentool ${tags}`; //${youtube.description}
    await Facebook.FanPage.publishContent(pup, fanPage);
    await Article.create({
      crawler_url_id: crawlerUrl.id,
      target_id: target.id,
      content: fanPage.content,
      name: "youtube-short",
    });
    await pup.func.delay(2);
    await pup.browser.close();
  }
}
