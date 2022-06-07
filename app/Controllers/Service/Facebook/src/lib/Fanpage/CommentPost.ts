import { FanpageInterface, PuppeteerInterface } from "../../Interface";

const ACTION_SELECT_INTERACT =
  ".oajrlxb2 > .l9j0dhe7 > .bp9cbjyn > .rq0escxv:nth-child(2) > .hu5pjgll";
const ACTION_SELECT_PAGE =
  ".oajrlxb2:nth-child(1) > .bp9cbjyn > .j83agx80 > .qzhwtbm6 > .d2edcug0";
const ACTION_SELECT_USER =
  ".oajrlxb2:nth-child(2) > .bp9cbjyn > .j83agx80 > .qzhwtbm6 > .d2edcug0";
const COMMENT_TYPE_1 = (st: number) => {
  return `.du4w35lb:nth-child(${st}) > .du4w35lb:nth-child(1) > div:nth-child(1) .lzcic4wl:nth-child(1) > .j83agx80:nth-child(1) > .rq0escxv:nth-child(1) > .j83agx80:nth-child(1) .cwj9ozl2:nth-child(2) .m9osqain:nth-child(1) .hcukyx3x:nth-child(1)`;
};
const COMMENT_TYPE_1_UPLOADTED = (st: number) => {
  return `.du4w35lb:nth-child(1) > .du4w35lb:nth-child(1) > div:nth-child(1) .lzcic4wl:nth-child(1) > .j83agx80:nth-child(1) > .rq0escxv:nth-child(1) > .j83agx80:nth-child(1) .o6r2urh6:nth-child(1) > .o6r2urh6:nth-child(1) .hcukyx3x:nth-child(1)`;
};
const COMMENT_TYPE_1_IMAGE = (st: number) => {
  return `.du4w35lb:nth-child(${st}) > .du4w35lb:nth-child(1) > div:nth-child(1) .lzcic4wl:nth-child(1) > .j83agx80:nth-child(1) > .rq0escxv:nth-child(1) > .j83agx80:nth-child(1) > .rq0escxv:nth-child(1) .ggphbty4:nth-child(2) .oajrlxb2:nth-child(1)`;
};
const COMMENT_TYPE_2 = (st: number) => {
  return `.du4w35lb:nth-child(${st}) > .du4w35lb:nth-child(1) > div:nth-child(1) > div:nth-child(1) > .lzcic4wl:nth-child(1) > .j83agx80:nth-child(1) > .rq0escxv:nth-child(1) .ecm0bbzt:nth-child(4) .m9osqain:nth-child(1) .hcukyx3x:nth-child(1)`;
};
const COMMENT_TYPE_2_UPLOADTED = (st: number) => {
  return `.du4w35lb:nth-child(${st}) > .du4w35lb:nth-child(1) > div:nth-child(1) > div:nth-child(1) > .lzcic4wl:nth-child(1) > .j83agx80:nth-child(1) .ecm0bbzt:nth-child(4) .o6r2urh6:nth-child(1) > .o6r2urh6:nth-child(1) .hcukyx3x:nth-child(1)`;
};
const COMMENT_TYPE_2_IMAGE = (st: number) => {
  return `.du4w35lb:nth-child(${st}) > .du4w35lb:nth-child(1) > div:nth-child(1) > div:nth-child(1) > .lzcic4wl:nth-child(1) > .j83agx80:nth-child(1) > .rq0escxv:nth-child(1) .ecm0bbzt:nth-child(4) .ggphbty4:nth-child(2) .oajrlxb2:nth-child(1)`;
};

class CommentPost {
  async create(pup: PuppeteerInterface, fanpage: FanpageInterface) {
    const { func } = pup;
    await func.clickTryCheck(ACTION_SELECT_INTERACT, ACTION_SELECT_USER);
    await func.click(ACTION_SELECT_USER);
    await func.delay(2);

    const pathFiles = await commentPostRecent(pup, fanpage, 5);
    if (pathFiles) await func.deleteFiles(pathFiles);
  }
}

const commentPostRecent = async (
  pup: PuppeteerInterface,
  fanpage: FanpageInterface,
  numRecentPost = 10
) => {
  const { func } = pup;
  let pathFiles: string[] = [];
  for (let i = 1; i < numRecentPost; i++) {
    await func.mouseWheelY(i * 500, i * 800);
    await func.delayRandom(2, 6);
    let selectorComment;
    let selectImages;
    if (await func.checkSelector(COMMENT_TYPE_1(i))) {
      if (fanpage?.images) {
        selectorComment = COMMENT_TYPE_1_UPLOADTED(i);
        selectImages = COMMENT_TYPE_1_IMAGE(i);
      } else selectorComment = COMMENT_TYPE_1(i);
    }
    if (await func.checkSelector(COMMENT_TYPE_2(i))) {
      if (fanpage?.images) {
        selectorComment = COMMENT_TYPE_2_UPLOADTED(i);
        selectImages = COMMENT_TYPE_2_IMAGE(i);
      } else selectorComment = COMMENT_TYPE_2(i);
    }
    if (selectorComment) {
      if (selectImages && fanpage?.images) {
        const imgs = await func.uploadImage(fanpage.images, selectImages);
        pathFiles = pathFiles.concat(imgs);
        await func.delay(2);
      }
      await func.click(selectorComment);
      await func.input(fanpage.content, "", 0.3);
      await func.input(String.fromCharCode(13));
    }
  }
  return pathFiles;
};
export default new CommentPost(); //choose page or user
