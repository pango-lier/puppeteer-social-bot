import { PuppeteerActionFunc } from "../../puppeteer/actionFunc";
import { delay } from "../../utils";

export const publishContent = async (func: PuppeteerActionFunc) => {
//   await func.checkSelector(
//     ".j83agx80 > .j83agx80 > .ihqw7lf3 > .rq0escxv > .oajrlxb2:not([aria-disabled=true])"
//   );
  //   for (let i = 0; i < 10; i++) {
  //     const _waitNotDisable = await func.checkDisabledSelector(
  //       ".j83agx80 > .j83agx80 > .ihqw7lf3 > .rq0escxv > .oajrlxb2",
  //       "aria-disabled"
  //     );
  //     if (_waitNotDisable == false) break;
  //     await delay(2);
  //   }
  await func.delay(15);
  await func.click(".j83agx80 > .j83agx80 > .ihqw7lf3 > .rq0escxv > .oajrlxb2");
};
