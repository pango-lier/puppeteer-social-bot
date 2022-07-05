import { PuppeteerInterface } from "Contracts/Social";
import { IGroup } from "../../Interface";
import { publishContent } from "./publishContent";

class Group {
  async publishContent(pup: PuppeteerInterface, group: IGroup) {
    const { func } = pup;
    await func.goto(group.url);
    await publishContent(pup.func, group);
  }
}
export default Group;
