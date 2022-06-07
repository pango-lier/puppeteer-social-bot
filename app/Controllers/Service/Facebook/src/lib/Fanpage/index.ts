import { FanpageInterface, PuppeteerInterface } from "../../Interface";
import ActionOthers from "./ActionOthers";
import CommentPost from "./CommentPost";
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
  async commentPost(pup: PuppeteerInterface, fanpage: FanpageInterface) {
    const { func } = pup;
    await func.goto(fanpage.url);
    await CommentPost.create(pup,fanpage);
  }
}

export default new Fanpage();
