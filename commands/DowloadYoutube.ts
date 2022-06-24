import { BaseCommand } from "@adonisjs/core/build/standalone";
import Facebook from "App/Controllers/Service/Facebook";
import {
  FanpageInterface,
  PuppeteerInterface,
} from "App/Controllers/Service/Facebook/src/Interface";
import { downloadFile, random } from "App/Controllers/Service/utils";
import { Profile } from "App/Controllers/Service/Types";
import Youtube from "App/Controllers/Service/Youtube";
import youtubedl from "youtube-dl-exec";
import BrowserProfile from "../app/Controllers/Service/Puppeteer/BrowserProfile";
import Env from "@ioc:Adonis/Core/Env";
import { delay } from "bullmq";
export default class DowloadYoutube extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = "download:youtube";

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
    stayAlive: false,
  };

  public async run() {
    const pup: PuppeteerInterface = await BrowserProfile.StartUp();
    const youtube = await Youtube.Short.downloadVideoAuto(pup);

    const profile: Profile = {
      userName: Env.get("MY_PW"),
      password: Env.get("MY_USER"),
    };
    await Facebook.Login.login(pup.func, profile);
    for (const video of youtube.videos) {
      const fanPage: FanpageInterface = {
        url: "https://www.facebook.com/T%C3%A2m-Nh%C3%B4m-K%C3%ADnh-%C4%90%C3%A0-L%E1%BA%A1t-108625631775421",
        content: video.description,
        images: [video.path],
        download: false,
      };
      await Facebook.FanPage.publishContent(pup, fanPage);
      await delay(5);
      await pup.func.goto("https://www.facebook.com");
      await delay(20);
    }

    await BrowserProfile.stop(pup.browser);
  }

  // public async dowload() {
  //   this.logger.info("Hello world!"); //https://www.youtube.com/shorts/OOcIwtX1me0
  //   // const path = await downloadFile(
  //   //   'https://www.youtube.com/shorts/OOcIwtX1me0',
  //   //   "vi" + random(1000, 1000000000)
  //   // );
  //   try {
  //     const ouput = await youtubedl(
  //       "https://www.youtube.com/shorts/WN0NHheQSSQ'",
  //       {
  //         dumpSingleJson: true,
  //         noWarnings: true,
  //         // noCallHome: true,
  //         noCheckCertificate: true,
  //         preferFreeFormats: true,
  //         youtubeSkipDashManifest: true,
  //         referer: "https://www.youtube.com/shorts/WN0NHheQSSQ",
  //       }
  //     );
  //     for (const format of ouput.formats) {
  //       if (format.vcodec !== "none" && format.acodec !== "none") {
  //         await downloadFile(
  //           format.url,
  //           "vi" + random(1000, 1000000000) + "." + format.ext
  //         );
  //         break;
  //       }
  //     }

  //     console.log(ouput.tags);
  //   } catch (error) {
  //     console.log(error?.message);
  //   }
  // }
}
