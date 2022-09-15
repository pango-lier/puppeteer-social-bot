import { BaseCommand } from "@adonisjs/core/build/standalone";
import BrowserProfile from "App/Controllers/Service/Puppeteer/BrowserProfile";

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
    stayAlive: true,
  };

  public async run() {
    const pup = await BrowserProfile.StartUp();
    await pup.page.goto("https://myaccount.google.com/");
    await pup.page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });
    // click vao tai khoan dang nhap
    await pup.func.click("#overview > .gacct-epilog > .gacct-epilog-col > .gacct-epilog-ctas > .h-c-button--primary");
    //forcus nhap email
    await pup.func.click('#identifierId');
    await pup.func.input("binhtrongcdt1@gmail");
    await pup.func.click('.qhFLie > #identifierNext > .VfPpkd-dgl2Hf-ppHlrf-sM5MNb > .VfPpkd-LgbsSe > .VfPpkd-vQzf8d');
    //click nut xac nhan email
    await pup.func.click('.F9NWFb > #identifierNext > .VfPpkd-dgl2Hf-ppHlrf-sM5MNb > .VfPpkd-LgbsSe > .VfPpkd-vQzf8d');
    //forcus o password
    await pup.func.click('#password > .aCsJod > .aXBtI > .Xb9hP > .whsOnd');
    await pup.func.input("");
    await pup.func.click('.qhFLie > #passwordNext > .VfPpkd-dgl2Hf-ppHlrf-sM5MNb > .VfPpkd-LgbsSe > .VfPpkd-vQzf8d');
  }
  //   await Youtube.Login.goto(pup);
  //   await Youtube.Login.gotoShort(pup);
  //   const link = await Youtube.Short.getLink(pup);
  //   await Youtube.Short.clickBtnDown(pup);
  //   await pup.func.delay(random(2, 15));


  //   const profile: Profile = {
  //     userName: Env.get("MY_PW"),
  //     password: Env.get("MY_USER"),
  //   };
  //   await Facebook.Login.login(pup.func, profile);
  //   for (const video of youtube.videos) {
  //     const fanPage: IFanpage = {
  //       url: "https://www.facebook.com/T%C3%A2m-Nh%C3%B4m-K%C3%ADnh-%C4%90%C3%A0-L%E1%BA%A1t-108625631775421",
  //       content: video.description,
  //       images: [video.path],
  //       download: false,
  //     };
  //     await Facebook.FanPage.publishContent(pup, fanPage);
  //     await delay(5);
  //     await pup.func.goto("https://www.facebook.com");
  //     await delay(20);
  //   }

  //   // await BrowserProfile.stop(pup.browser);
  // }

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
