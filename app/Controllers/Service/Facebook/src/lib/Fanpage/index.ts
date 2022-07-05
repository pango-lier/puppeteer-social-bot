import { PuppeteerInterface } from "Contracts/Social";
import { IFanpage, IComment } from "../../Interface";
import ActionOthers from "./ActionOthers";
import CommentPost from "./CommentPost";
import { publishContent } from "./publishContent";

class Fanpage {
  async goto(pup: PuppeteerInterface, url: string) {
    const { func } = pup;
    await func.goto(url);
  }
  async publishContent(pup: PuppeteerInterface, fanpage: IFanpage) {
    await publishContent(pup.func, fanpage);
  }
  async inviteFriend(pup: PuppeteerInterface) {
    await ActionOthers.inviteFriend(pup);
  }
  async commentPost(pup: PuppeteerInterface, comment: IComment) {
    await CommentPost.create(pup, comment);
  }
}

export default Fanpage;
