
import BrowserProfile from "../../../Puppeteer/BrowserProfile";

import Facebook from "../..";
import { ECommentType, IComment } from "../Interface";
import { IProfile, PuppeteerInterface } from "Contracts/Social";

export const Example = async () => {
  const profile: IProfile = {
    userName: "user_name",
    password: "password",
  };
  const comment: IComment = {
    url: "https://www.facebook.com/T%C3%A2m-Nh%C3%B4m-K%C3%ADnh-%C4%90%C3%A0-L%E1%BA%A1t-108625631775421",
    content: "test",
    images: ["https://nhomkinhdalat.com/storage/post/t164765729689.jpg"],
    options: {
      type: ECommentType.index,
      postRecentStart: 1
    },
  };

  const pup: PuppeteerInterface = await BrowserProfile.StartUp();
  await Facebook.Login.login(pup.func, profile);
  await Facebook.FanPage.commentPost(pup, comment);
  await pup.func.delay(20);
  await BrowserProfile.stop(pup?.browser || "");
};
