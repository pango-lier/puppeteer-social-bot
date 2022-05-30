import { Profile, PuppeteerInterface } from "../Interface";
import BrowserProfile from "../puppeteer/browser";
import Fanpage from "./Fanpage";
import { login } from "./Login/index";

export const Login = async (profile: Profile) => {
  const pup: PuppeteerInterface = await BrowserProfile.StartUp();
  await login(pup.func, profile);
  const url =
    "https://www.facebook.com/Website-115041168916224";
  let images = [
    "https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-6/283954709_131284709509513_445255171833006986_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=p8kgYQ9PvEMAX_nHHh8&tn=Fd2Dw3XRuxeewy6A&_nc_ht=scontent.fdad1-3.fna&oh=00_AT8LuuyCcseLxstzqOpk9WFdTg4a3jjFRGOmOdmzMtt8Cg&oe=6296209D",
  ];
  await Fanpage.publishContent(pup, {
    url: url,
    content: "test",
    images: images,
  });
  await pup.func.delay(20);
  await BrowserProfile.stop(pup?.browser || "");
};
