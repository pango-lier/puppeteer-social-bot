import { PuppeteerInterface } from "Contracts/Social";
import { E_GOOGLE, E_GOOGLE_SELECTOR } from "./const";

export interface IGmailLogin {
  password?: string;
  email?: string;
  username?: string;
  url?: string;
}

export class GmailLogin {
  async login(login: IGmailLogin, pup: PuppeteerInterface) {
    await pup.func.goto(E_GOOGLE.URL_ACCOUNT);

    if (await pup.func.isUrlCurrent(E_GOOGLE.URL_GOOGLE_ACCOUNT_ABOUT)) {
      await pup.func.click(
        // click go to URL_ACCOUNT
        "#overview > .gacct-epilog > .gacct-epilog-col > .gacct-epilog-ctas > .h-c-button--primary"
      );
    }
    //forcus nhap email

    await pup.func.click(E_GOOGLE_SELECTOR.INPUT_EMAIL);
    await pup.func.input(login.email);
    // click nut xac nhan email
    await pup.func.click(E_GOOGLE_SELECTOR.BUTTON_ACCEPT_EMAIL);
    await pup.func.delay(1);
    if (await pup.func.isUrlCurrent(E_GOOGLE.URL_GOOGLE_LOGIN_REJECT)) {
      // if reject
      await pup.func.click("#next");
    }
    // //forcus o password
    await pup.func.click(E_GOOGLE_SELECTOR.INPUT_PASSWORD);
    await pup.func.input(login.password);
    await pup.func.click(E_GOOGLE_SELECTOR.BUTTON_ACCEPT_PASSWORD);
  }
}
