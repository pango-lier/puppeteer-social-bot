import { FanpageInterface } from "../../Interface";
import { PuppeteerActionFunc } from "../../../../Puppeteer/PuppeteerActionFunc";

const CREATE_NEW_CONTENT_BUTTON =
  ".buofh1pr:nth-child(2) > .oajrlxb2 > .l9j0dhe7 > .n00je7tq";
const INPUT_NEW_CONTENT = "._5rpb > .notranslate > div > div > ._1mf";

export const publishContent = async (
  func: PuppeteerActionFunc,
  fanpage: FanpageInterface
) => {
  await popupContent(func);
  await func.delay(0.5);
  await func.input(fanpage.content, "", 50);
  await func.delay(2);
  const pathFiles = await selectImages(
    func,
    fanpage?.images,
    fanpage?.download
  );
  if (fanpage?.type === "video") {
    await waitUploadVideo(func);
  }
  await actionPublishContent(func);
  if (pathFiles) await func.deleteFiles(pathFiles);
};

const waitUploadVideo = async (func: PuppeteerActionFunc) => {
  for (let i = 0; i < 10; i++) {
    try {
      await func.waitForSelector(
        `.rq0escxv > .k4urcfbm > .l9j0dhe7 > .b3i9ofy5 > .n3ffmt46`
      );
      const content = await func.getContentSelector(
        `.rq0escxv > .k4urcfbm > .l9j0dhe7 > .b3i9ofy5 > .n3ffmt46`
      );
      console.log(content);
      if (content === "100%") break;
      await func.delay(2);
    } catch (e) {}
    await func.delay(2);
  }
};

const popupContent = async (func: PuppeteerActionFunc) => {
  await func.clickTryCheck(CREATE_NEW_CONTENT_BUTTON, INPUT_NEW_CONTENT);
  await func.click(INPUT_NEW_CONTENT);
};

const actionPublishContent = async (func: PuppeteerActionFunc) => {
  const action1 = ".j83agx80 > .j83agx80 > .ihqw7lf3 > .rq0escxv > .oajrlxb2";
  const action2 =
    ".rq0escxv:nth-child(4) > .rq0escxv > .rq0escxv > .oajrlxb2 > .l9j0dhe7";
  if (await func.checkSelector(action2)) {
    await func.waitForSelector(`${action2}:not([aria-disabled])`);
    await func.click(action2);
  } else {
    await func.waitForSelector(`${action1}:not([aria-disabled])`);
    await func.click(action1);
  }
};

const selectImages = async (func, images, download): Promise<string[]> => {
  if (images) {
    if (
      await func.checkSelector(
        "div:nth-child(2) > .tojvnm2t > .oajrlxb2 > div > div > .tv7at329 > .iyyx5f41 > .bp9cbjyn > .hu5pjgll"
      )
    ) {
      return await func.uploadImage(
        images,
        "div:nth-child(2) > .tojvnm2t > .oajrlxb2 > div > div > .tv7at329 > .iyyx5f41 > .bp9cbjyn > .hu5pjgll",
        download
      );
    }
    await func.click(
      ".dwxx2s2f:nth-child(1) > div:nth-child(1) > .tojvnm2t:nth-child(1) > .oajrlxb2:nth-child(1) > div:nth-child(1) > div:nth-child(1) > .tv7at329:nth-child(1) > .iyyx5f41:nth-child(1) > .bp9cbjyn:nth-child(1) > .hu5pjgll:nth-child(1)"
    );
    await func.delay(2);
    return await func.uploadImage(
      images,
      ".l9j0dhe7 > .rq0escxv > .rq0escxv > .s45kfl79 > .hu5pjgll",
      download
    );
  }
  return [];
};
