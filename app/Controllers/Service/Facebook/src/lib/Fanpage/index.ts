import {
  CommentInterface,
  FanpageInterface,
  PuppeteerInterface,
} from "../../Interface";
import ActionOthers from "./ActionOthers";
import CommentPost from "./CommentPost";
import { publishContent } from "./publishContent";

class Fanpage {
  async goto(pup: PuppeteerInterface, url: string) {
    const { func } = pup;
    await func.goto(url);
  }
  async publishContent(pup: PuppeteerInterface, fanpage: FanpageInterface) {
    await publishContent(pup.func, fanpage);
  }
  async inviteFriend(pup: PuppeteerInterface, fanpage: FanpageInterface) {
    await ActionOthers.inviteFriend(pup);
  }
  async commentPost(pup: PuppeteerInterface, comment: CommentInterface) {
    await CommentPost.create(pup, comment);
  }
}

export default Fanpage;
