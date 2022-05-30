import puppeteer, { ElementHandle, HTTPResponse } from "puppeteer";
import { delay, downloadFile } from "../utils";

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
  async awaitElementRemove(selector): Promise<ElementHandle<Element>> {
    return this.page.waitForSelector(selector, { hidden: true });
  }
  async getElementByContent(content: string, target): Promise<ElementHandle> {
    const elements = await this.page.$$(target);
    for (const element of elements) {
      const contentElement = await this.page.evaluate(
        (name) => name.innerText,
        element
      );
      if ((contentElement || "").trim() === content) {
        return element;
      }
    }
    return null;
  }
  async getElementByElement(
    element: ElementHandle,
    target: string
  ): Promise<ElementHandle> {
    if (!element) {
      return null;
    }
    const parentElement = await element.getProperty("parentNode");
    if (!parentElement) {
      return null;
    }
    const found = await parentElement.asElement().$(target);
    if (!found) {
      return this.getElementByElement(parentElement.asElement(), target);
    }
    if (found) {
      return found;
    }
  }
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
      return this.page.keyboard.type(value + "", {
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
  async uploadFile(url, selector, conditionPass): Promise<boolean> {
    const formUpload = await this.page.waitForSelector(selector);
    const pathFile = await downloadFile(url);
    await delay(1);
    await formUpload.uploadFile(pathFile);
    await delay(1);
    const result = formUpload.evaluate((upload) =>
      upload.dispatchEvent(new Event("change", { bubbles: true }))
    );
    // await this.page.waitForSelector(conditionPass, { timeout: 300000 });
    try {
      const fs = require("fs");
      await delay(1);
      await fs.unlinkSync(pathFile);
    } catch (e) {}
    return result;
  }

  async uploadImage(
    imagePaths: string[],
    fileChooserTriggerXpath: string
  ): Promise<string[]> {
    let pathFiles: string[] = [];
    await imagePaths.forEach(async (imagePath) => {
      const pathFile = await downloadFile(imagePath);
      pathFiles.push(pathFile);
    });

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
  async getContent(selector): Promise<string> {
    return this.page.evaluate((selector) => {
      const element = document.querySelector(selector);
      return element.textContent.trim();
    }, selector);
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
  // async changeValueInputOnContainer(selector): Promise<void> {
  //   return this.page.evaluate(async (variables) => {
  //     const variable = JSON.parse(variables);
  //     const elements = Array.from(document.querySelectorAll(variable.target));
  //     for (const element of elements) {
  //       switch (variable.type) {
  //         case "checkbox":
  //           const valueCheckbox = element.checked + "";
  //           if (variable.value === valueCheckbox) {
  //             element.click();
  //           }
  //           element.click();
  //           element.checked = variable.value === "true";
  //           break;
  //         default:
  //           break;
  //       }
  //       await new Promise((rs) => setTimeout(rs, 300));
  //     }
  //   }, JSON.stringify(step));
  // }
  // async setCheckedInput(target: string, value: any): Promise<void> {
  //   await delay(this.delayClickTime);
  //   return this.page.evaluate((variables) => {
  //     const { target: e, value: v } = JSON.parse(variables);
  //     const element = document.querySelector(e);
  //     if (element) {
  //       element.scrollIntoView({ behavior: "smooth" });
  //       if (element.checked === v) {
  //         element.click();
  //       }
  //       element.click();
  //       element.checked = v;
  //     }
  //   }, JSON.stringify({ target, value }));
  // }
  // async bulkSetCheckedInput(target: string, value: any): Promise<void> {
  //   await delay(this.delayClickTime);
  //   return this.page.evaluate((variables) => {
  //     const { target: e, value: v } = JSON.parse(variables);
  //     const elements = Array.from(document.querySelectorAll(e));
  //     for (const element of elements) {
  //       if (element) {
  //         element.scrollIntoView({ behavior: "smooth" });
  //         if (element.checked === v) {
  //           element.click();
  //         }
  //         element.click();
  //         element.checked = v;
  //       }
  //     }
  //   }, JSON.stringify({ target, value }));
  // }

  checkSelector(params) {
    return this.page.evaluate((params) => {
      return document.querySelector(params) === null ? false : true;
    }, params);
  }

  checkDisabledId(id) {
    return this.page.evaluate((id) => {
      return document.getElementById(id).hasAttribute("disabled")
        ? true
        : false;
    }, id);
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
          data.push(elements[i].textContent.trim());
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
