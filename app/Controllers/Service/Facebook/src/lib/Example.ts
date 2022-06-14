import { CommentInterface, Profile, PuppeteerInterface } from "../Interface";
import BrowserProfile from "../puppeteer/browser";
import Fanpage from "./Fanpage";
import { login } from "./Login/index";

export const Example = async () => {
  const profile: Profile = {
    userName: 'user_name',
    password: 'password',
  };
  const comment: CommentInterface = {
    url: "https://www.facebook.com/T%C3%A2m-Nh%C3%B4m-K%C3%ADnh-%C4%90%C3%A0-L%E1%BA%A1t-108625631775421",
    content: "test",
    images: ["https://nhomkinhdalat.com/storage/post/t164765729689.jpg"],
  };

  const pup: PuppeteerInterface = await BrowserProfile.StartUp();
  await login(pup.func, profile);
  await Fanpage.commentPost(pup, comment);
  await pup.func.delay(20);
  await BrowserProfile.stop(pup?.browser || "");
};
