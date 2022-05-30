import { FanpageInterface, PuppeteerInterface } from "../Interface";
import { publishContent } from "./Fanpage/publishContent";
import { selectImages } from "./Fanpage/selectImage";

class Fanpage {
  async post(pup: PuppeteerInterface, fanpage: FanpageInterface) {
    const { func } = pup;
    await func.goto(fanpage.url);
    await func.clickTryCheck(
      ".buofh1pr:nth-child(2) > .oajrlxb2 > .l9j0dhe7 > .n00je7tq",
      "._5rpb > .notranslate > div > div > ._1mf"
    );
    await func.click("._5rpb > .notranslate > div > div > ._1mf");
    await func.delay(0.5);
    await func.input(fanpage.content, "", 50);
    await func.delay(0.5);
    const pathFiles = await selectImages(func, fanpage?.images);
    await func.delay(1);
    await publishContent(func);
    if (pathFiles) await func.deleteFiles(pathFiles);
  }
}

export default new Fanpage();
