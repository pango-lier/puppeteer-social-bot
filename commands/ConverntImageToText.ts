import { BaseCommand } from "@adonisjs/core/build/standalone";
import BrowserProfile from "App/Controllers/Service/Puppeteer/BrowserProfile";
import { PuppeteerActionFunc } from "App/Controllers/Service/Puppeteer/PuppeteerActionFunc";
import { delay } from "App/Controllers/Service/utils";
import { PuppeteerInterface } from "Contracts/Social";

export default class ConverntImageToText extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = "convernt:image_to_text";

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
    const { page, func }: PuppeteerInterface = await BrowserProfile.StartUp();
    await page.goto(
      "https://nhomkinhdalat.com/"
    );
    let a = 0;
    for (let i = 6861; i++; i < 6861 + 125) {
      try {
        console.log(a++);
        await this.clickCheck(
          func,
          "#cate_id_0 > .container > .content > .readmore > a > p"
        );
        console.log(a++);
        await this.closeSocial(func);
        console.log(a++);
        await func.uploadImage(
          [`/home/trong/Downloads/wetransfer/IMG_${i}.jpeg`],
          ".page-template-default > .dz-hidden-input",
          false
        );
        console.log(a++);

        await this.closeSocial(func);
        await delay(2);
        // await func.click(".page-template-default > .dz-hidden-input");
        await this.closeSocial(func);
        await func.click("#dl-file");
        await delay(2);
        await this.closeSocial(func);
      } catch (e) {
        i--;
        console.log(`s:${i}`, e?.message);
      }
    }
  }

  async closeSocial(func: PuppeteerActionFunc) {
    if (await func.checkSelector("#close-social")) {
      // await func.click("#close-social");
    }
  }

  async clickCheck(func: PuppeteerActionFunc, selector: string) {
    await this.closeSocial(func);
    console.log(await func.checkSelector(selector));
    if (await func.checkSelector(selector)) await func.click(selector);
  }
}
