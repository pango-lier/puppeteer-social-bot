
import { PuppeteerActionFunc } from "../../../../Puppeteer/PuppeteerActionFunc";
import { IGroup } from "../../Interface";

const CREATE_NEW_CONTENT_BUTTON =
  ".rq0escxv > .bp9cbjyn > .oajrlxb2 > .m9osqain > .a8c37x1j";
const INPUT_NEW_CONTENT = "._5rpb > .notranslate > div > .bi6gxh9e > ._1mf";

export const publishContent = async (
  func: PuppeteerActionFunc,
  group: IGroup
) => {
  await popupContent(func);
  await func.delay(0.5);
  await func.input(group.content, "", 50);
  await func.delay(2);
  const pathFiles = await selectImages(func, group?.images, group?.download);
  await func.delay(1);
  await actionPublishContent(func);
  if (pathFiles) await func.deleteFiles(pathFiles);
};

const popupContent = async (func: PuppeteerActionFunc) => {
  await func.clickTryCheck(CREATE_NEW_CONTENT_BUTTON, INPUT_NEW_CONTENT);
  await func.click(INPUT_NEW_CONTENT);
};

const actionPublishContent = async (func: PuppeteerActionFunc) => {
  await func.waitForSelector(
    ".ihqw7lf3 > .rq0escxv > .oajrlxb2 > .l9j0dhe7 > .bp9cbjyn:not([aria-disabled])"
  );
  await func.click(".ihqw7lf3 > .rq0escxv > .oajrlxb2 > .l9j0dhe7 > .bp9cbjyn");
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
