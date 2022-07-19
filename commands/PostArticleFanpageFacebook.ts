import { BaseCommand } from "@adonisjs/core/build/standalone";
import { PostVideoLinkYoutubeFacebook } from "App/Controllers/Service/Manual/src/PostVideoLinkYoutubeFacebook";

import Crawler from "App/Models/Crawler";
import Target from "App/Models/Target";

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
    const urls = ['https://www.youtube.com/watch?v=7EXfyD_Yae0&t=447s',
      'https://www.youtube.com/watch?v=MjeFdeEBZBo',
      'https://www.youtube.com/watch?v=epElL3Drc9A',
      'https://www.youtube.com/watch?v=hGZCPXBgbv4&t=352s',
      'https://www.youtube.com/watch?v=DzFX2631jJw',
      'https://www.youtube.com/watch?v=nG1kAukuIsk',
      'https://www.youtube.com/watch?v=Ev7eJ_--Nx8',
      'https://www.youtube.com/watch?v=b33Bqu00eEU',
      'https://www.youtube.com/watch?v=HK5OsDWYJmQ',
      'https://www.youtube.com/watch?v=1CqGeAmVu1I',
      'https://www.youtube.com/watch?v=NtaLEt4GqNw',
      'https://www.youtube.com/watch?v=ESsSUMYbH6I',
      'https://www.youtube.com/watch?v=XqunXMp-A1M',
      'https://www.youtube.com/watch?v=XuKLs3oV3xU'];
    const description = '';
    const tags = "#history #lichsu #lichsuAZ";
    const target = await Target.find(2);
    const crawler = await Crawler.find(2);

    for (const url of urls) {
      if (target && crawler) await PostVideoLinkYoutubeFacebook({ url, description, tags }, crawler, target);
    }

    // if (target) AutoGetShortYoutubePostFacebook(target);
  }
}
