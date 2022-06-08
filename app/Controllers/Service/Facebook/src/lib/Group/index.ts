import { GroupInterface, PuppeteerInterface } from "../../Interface";
import { publishContent } from "./publishContent";

class Group {
  async publishContent(pup: PuppeteerInterface, group: GroupInterface) {
    const { func } = pup;
    await func.goto(group.url);
    await publishContent(pup.func, group);
  }
}
export default new Group();
