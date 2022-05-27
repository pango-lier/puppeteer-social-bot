import { Profile } from "../Interface";
import { PuppeteerActionFunc } from "../puppeteer/actionFunc";
import BrowserProfile from "../puppeteer/browser";
import Fanpage from "./Fanpage";
import { enterUserName,enterPassword,clickLogin } from "./Login/index";

export const Login = async (profile: Profile) => {
  const browser = await BrowserProfile.start();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 937 });
  const func = new PuppeteerActionFunc(page);
  await func.goto("https://www.facebook.com/");
  await enterUserName(func, profile.userName);
  await enterPassword(func, profile.password);
  await clickLogin(func);
  const url =
    "https://www.facebook.com/T%C3%A2m-Nh%C3%B4m-K%C3%ADnh-%C4%90%C3%A0-L%E1%BA%A1t-108625631775421";
  let images = [
    "https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-6/283954709_131284709509513_445255171833006986_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=p8kgYQ9PvEMAX_nHHh8&tn=Fd2Dw3XRuxeewy6A&_nc_ht=scontent.fdad1-3.fna&oh=00_AT8LuuyCcseLxstzqOpk9WFdTg4a3jjFRGOmOdmzMtt8Cg&oe=6296209D",
  ];
  await Fanpage.post(
    { func, page, browser },
    { url: url, content: "test", images: images }
  );
  await func.delay(20);
  await BrowserProfile.stop(browser);
};
