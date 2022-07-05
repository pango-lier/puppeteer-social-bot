
import { PuppeteerInterface } from "Contracts/Social";
import { IComment } from "../../Interface";
import SwitchUser from "./SwitchUser";

const COMMENT_TYPE_1 = (st: number) => {
  return `.du4w35lb:nth-child(${st}) > .du4w35lb:nth-child(1) > div:nth-child(1) .lzcic4wl:nth-child(1) > .j83agx80:nth-child(1) > .rq0escxv:nth-child(1) > .j83agx80:nth-child(1) .cwj9ozl2:nth-child(2) .m9osqain:nth-child(1) .hcukyx3x:nth-child(1)`;
};
const COMMENT_TYPE_1_UPLOADTED = (st: number) => {
  return `.du4w35lb:nth-child(${st}) > .du4w35lb:nth-child(1) > div:nth-child(1) .lzcic4wl:nth-child(1) > .j83agx80:nth-child(1) > .rq0escxv:nth-child(1) > .j83agx80:nth-child(1) .o6r2urh6:nth-child(1) > .o6r2urh6:nth-child(1) .hcukyx3x:nth-child(1)`;
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
  async create(pup: PuppeteerInterface, comment: IComment) {
    const { func } = pup;
    await SwitchUser.selectUser(pup);
    const pathFiles = await commentPostRecent(pup, comment);
    if (pathFiles) await func.deleteFiles(pathFiles);
  }
}

const commentPostRecent = async (
  pup: PuppeteerInterface,
  comment: IComment
) => {
  const { func } = pup;
  let pathFiles: string[] = [];
  const endLoop = comment.options?.postRecentEnd || comment.options?.postRecentStart || 0;
  for (let i = comment.options?.postRecentStart || 0; i <= endLoop; i++) {
    await func.mouseWheelY(i * 500, i * 800);
    await func.delayRandom(2, 6);
    let selectorComment;
    let selectImages;
    if (await func.checkSelector(COMMENT_TYPE_1(i))) {
      if (comment?.images) {
        selectorComment = COMMENT_TYPE_1_UPLOADTED(i);
        selectImages = COMMENT_TYPE_1_IMAGE(i);
      } else selectorComment = COMMENT_TYPE_1(i);
    }
    if (await func.checkSelector(COMMENT_TYPE_2(i))) {
      if (comment?.images) {
        selectorComment = COMMENT_TYPE_2_UPLOADTED(i);
        selectImages = COMMENT_TYPE_2_IMAGE(i);
      } else selectorComment = COMMENT_TYPE_2(i);
    }
    if (selectorComment) {
      if (selectImages && comment?.images) {
        const imgs = await func.uploadImage(comment.images, selectImages);
        pathFiles = pathFiles.concat(imgs);
        await func.delay(5);
      }
      await func.click(selectorComment);
      await func.input(comment.content, "", 0.3);
      await func.input(String.fromCharCode(13));
    }
  }
  return pathFiles;
};
export default new CommentPost(); //choose page or user
