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
    const url = 'https://www.youtube.com/watch?v=6S5I1yjRWV4';
    const description = 'Thế Chiến 1';
    const tags = "#history #lichsu #lichsuAZ";
    const target = await Target.find(2);
    const crawler = await Crawler.find(2);
    if (target && crawler) PostVideoLinkYoutubeFacebook({ url, description, tags }, crawler, target)
    // if (target) AutoGetShortYoutubePostFacebook(target);
  }
}
