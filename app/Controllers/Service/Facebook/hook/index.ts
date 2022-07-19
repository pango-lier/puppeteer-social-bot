import Account from "App/Models/Account";
import Target from "App/Models/Target";
import { IProfile, PuppeteerInterface } from "Contracts/Social";
import Facebook from "..";
import BrowserProfile from "../../Puppeteer/BrowserProfile";

class hook {
  async login(target: Target) {
    const pup: PuppeteerInterface = await BrowserProfile.StartUp();
    if (target?.type !== "facebook-fanpage") throw new Error("Target must be facebook-fanpage .");
    const account = await Account.find(target?.account_id);
    if (!(account?.user_name && account?.password)) throw new Error("Username or password failed .");
    const profile: IProfile = {
      userName: account?.user_name,
      password: account?.password,
    };
    await Facebook.Login.login(pup.func, profile);
    await Facebook.FanPage.goto(pup, target.url);
    return pup;
  }
}
export default hook;
