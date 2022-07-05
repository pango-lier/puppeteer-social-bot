
import { IProfile } from "Contracts/Social";
import { PuppeteerActionFunc } from "../../../../Puppeteer/PuppeteerActionFunc";

export const enterUserName = async (func: PuppeteerActionFunc, userName) => {
  await func.click("#email");
  await func.input(userName, "", 500);
};

export const enterPassword = async (func: PuppeteerActionFunc, password) => {
  await func.click("#pass");
  await func.input(password, "", 500);
};

export const clickLogin = async (func: PuppeteerActionFunc) => {
  await func.click('button[name="login"]');
  await func.waitForSelector(
    ".buofh1pr:nth-child(1) > .tojvnm2t > .bp9cbjyn > .oajrlxb2 > .l9j0dhe7 > .a8c37x1j"
  );
};

class Login {
  async login(func: PuppeteerActionFunc, profile: IProfile) {
    await func.goto("https://www.facebook.com/");
    await enterUserName(func, profile.userName);
    await enterPassword(func, profile.password);
    await clickLogin(func);
  }

  async goto(func: PuppeteerActionFunc) {
    await func.goto("https://www.facebook.com/");
  }
}
export default Login;
