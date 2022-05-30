import { FanpageInterface, PuppeteerInterface } from "../../Interface";
import ActionOthers from "./ActionOthers";
import { publishContent } from "./publishContent";

class Fanpage {
  async publishContent(pup: PuppeteerInterface, fanpage: FanpageInterface) {
    const { func } = pup;
    await func.goto(fanpage.url);
    await publishContent(pup.func, fanpage);
  }
  async inviteFriend(pup: PuppeteerInterface, fanpage: FanpageInterface) {
    const { func } = pup;
    await func.goto(fanpage.url);
    await ActionOthers.inviteFriend(pup);
  }
}

export default new Fanpage();
