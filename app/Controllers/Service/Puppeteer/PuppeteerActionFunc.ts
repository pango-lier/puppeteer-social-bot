import puppeteer, { HTTPResponse } from "puppeteer";
import { delay, downloadFile, random } from "../utils";

export class PuppeteerActionFunc {
  page: puppeteer.Page;
  delayClickTime: number;
  delayTypingTime: number;
  constructor(
    page: puppeteer.Page,
    delayClickTime?: number,
    delayTypingTime?: number
  ) {
    this.page = page;
    this.delayClickTime = delayClickTime || 0.3;
    this.delayTypingTime = delayTypingTime || 0.05;
  }
  /**
   * click element
   * @param {puppeteer.Page} page current tab
   * @param {IStep} step step action
   * @returns {void}
   */
  async click(target: string): Promise<void> {
    await delay(this.delayClickTime);
    await this.page.waitForSelector(target);
    return this.page.click(target);
  }
  /**
   * goto url
   * @param {puppeteer.Page} page current tab
   * @param {IStep} step step action
   * @returns {HTTPResponse}
   */
  async goto(url): Promise<HTTPResponse> {
    return this.page.goto(url, {
      waitUntil: "networkidle2",
    });
  }
  /**
   * await a element show in DOM
   * @param {puppeteer.Page} page current tab
   * @param {IStep} step step action
   * @returns {ElementHandle<Element>}
   */
  async waitForSelector(selector) {
    return this.page.waitForSelector(selector);
  }
  /**
   * await a element Remove
   * @param {puppeteer.Page} page current tab
   * @param {IStep} step step action
   * @returns {ElementHandle<Element>}
   */
  /**
   * Type some text with speed per character is default 0,05s
   * @param {puppeteer.Page} page current tab
   * @param {IStep} step step action
   * @returns {void}
   */
  async input(value, currentValue = "", delay = 1000): Promise<void> {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < currentValue.length; i++) {
      await this.page.keyboard.press("Backspace");
    }
    if (value !== null && value !== undefined && value !== "null") {
      return this.page.keyboard.type(value, {
        delay: this.delayTypingTime * delay,
      });
    }
  }
  /**
   * Upload file target input type file
   * @param {puppeteer.Page} page current tab
   * @param {IStep} step step action
   * @returns {void}
   */
  // async uploadFile(url, selector, conditionPass): Promise<boolean> {
  //   const formUpload = await this.page.waitForSelector(selector);
  //   const pathFile = await downloadFile(url);
  //   await delay(1);
  //   await formUpload.uploadFile(pathFile);
  //   await delay(1);
  //   const result = formUpload.evaluate((upload) =>
  //     upload.dispatchEvent(new Event("change", { bubbles: true }))
  //   );
  //   // await this.page.waitForSelector(conditionPass, { timeout: 300000 });
  //   try {
  //     const fs = require("fs");
  //     await delay(1);
  //     await fs.unlinkSync(pathFile);
  //   } catch (e) {}
  //   return result;
  // }

  async uploadImage(
    imagePaths: string[],
    fileChooserTriggerXpath: string,
    download: boolean = true
  ): Promise<string[]> {
    let pathFiles: string[] = [];
    if (!download) {
      pathFiles = imagePaths;
    } else {
      await imagePaths.forEach(async (imagePath) => {
        const pathFile = await downloadFile(imagePath);
        console.log(pathFile);
        pathFiles.push(pathFile);
      });
    }
    const [fileChooser] = await Promise.all([
      this.page.waitForFileChooser(),
      this.click(fileChooserTriggerXpath),
    ]);

    await fileChooser?.accept(pathFiles);
    return pathFiles;
  }

  async deleteFiles(pathFiles: string[]): Promise<boolean> {
    await pathFiles.forEach(async (pathFile) => {
      try {
        const fs = require("fs");
        await delay(0.3);
        await fs.unlinkSync(pathFile);
      } catch (e) {}
    });

    return true;
  }

  /**
   * Delay
   * @param {puppeteer.Page} page current tab
   * @param {IStep} step step action
   * @returns {void}
   */
  async delay(selector): Promise<void> {
    return delay(Number(selector));
  }

  async delayRandom(min, max): Promise<void> {
    return delay(Number(random(min, max)));
  }

  async getContent(selector): Promise<string> {
    return this.page.evaluate((selector) => {
      const element = document.querySelector(selector);
      return element.textContent.trim();
    }, selector);
  }

  async mouseWheelY(min: number, max: number = -1) {
    if (max == -1) {
      max = min;
    }
    await this.page.mouse.wheel({ deltaY: random(min, max) });
  }

  async clickTryCheck(selectorTarget, selectorCheck, loop = 5, delay = 1) {
    for (let i = 0; i < loop; i++) {
      await this.click(selectorTarget);
      await this.delay(delay);
      if (await this.checkSelector(selectorCheck)) {
        break;
      }
    }
  }

  checkSelector(params) {
    return this.page.evaluate((params) => {
      return document.querySelector(params) === null ? false : true;
    }, params);
  }

  checkDisabledSelector(params, attribute = "disabled") {
    return this.page.evaluate((params) => {
      return document.querySelector(params).hasAttribute(attribute)
        ? true
        : false || false;
    }, params);
  }

  checkExistId(id) {
    return this.page.evaluate((id) => {
      var myElement = document.getElementById(id);
      if (myElement) return true;
      return false;
    }, id);
  }

  getContentSelector(selector) {
    return this.page.evaluate((selector) => {
      var element = document.querySelector(selector);
      if (element) {
        return element.textContent.trim();
      }
      return false;
    }, selector);
  }

  getContentSelectorAll(selector) {
    return this.page.evaluate((selector) => {
      var elements = document.querySelectorAll(selector);
      let data = [];
      if (elements) {
        for (let i = 0; i < elements.length; i++) {
          // data.push(elements[i].textContent.trim());
        }
        return data;
      }
      return false;
    }, selector);
  }

  getHrefSelector(selector) {
    return this.page.evaluate((selector) => {
      var element = document.querySelector(selector);
      if (element) {
        return element.href;
      }
      return false;
    }, selector);
  }

  selectDate(selector, day) {
    return this.page.evaluate(
      ({ selector, day }) => {
        var tags = document.querySelectorAll(selector);
        for (let i = 0; i < tags.length; i++) {
          if (tags[i].textContent.trim() == day.toString()) {
            tags[i].click();
          }
        }
        return false;
      },
      { selector, day }
    );
  }
}
