// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {
  CommentInterface,
  ECommentType,
  Profile,
  PuppeteerInterface,
} from "App/Controllers/Service/Facebook/src/Interface";
import BrowserProfile from "App/Controllers/Service/Puppeteer/BrowserProfile";
import Env from "@ioc:Adonis/Core/Env";
import Facebook from "App/Controllers/Service/Facebook";
import BullMQ from "@ioc:Queue/BullMQ";
import { QueueNamesEnum, TestProps } from "Contracts/queue/QueueInterfaces";
const queue = BullMQ.queue<TestProps, TestProps>(QueueNamesEnum.TestJob);
export default class FanPagesController {
  public async post() {
    await queue.add("mytestJob", { name: "anyName" });
    const profile: Profile = {
      userName: Env.get("MY_PW"),
      password: Env.get("MY_USER"),
    };
    const comment: CommentInterface = {
      url: "https://www.facebook.com/T%C3%A2m-Nh%C3%B4m-K%C3%ADnh-%C4%90%C3%A0-L%E1%BA%A1t-108625631775421",
      content: "test",
      images: ["https://nhomkinhdalat.com/storage/post/t164765729689.jpg"],
      type: {
        type: ECommentType.random,
        postRecentStart: 1,
        postRecentEnd: 2,
      },
    };

    const pup: PuppeteerInterface = await BrowserProfile.StartUp();
    await Facebook.Login.login(pup.func, profile);
    await Facebook.FanPage.goto(pup, comment);
    await Facebook.FanPage.commentPost(pup, comment);
    await pup.func.delay(20);
    await BrowserProfile.stop(pup?.browser || "");
    return "ok";
  }
}
