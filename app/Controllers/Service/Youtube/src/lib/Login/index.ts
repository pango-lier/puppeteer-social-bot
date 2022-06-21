import { PuppeteerInterface } from "App/Controllers/Service/Facebook/src/Interface";

export enum EnumLink {
  Home = 1,
  Development = 2,
  Short = 3,
  Subcrice = 4,
}

const links = (link: EnumLink) =>
  `.style-scope:nth-child(${link}) > #items > .style-scope:nth-child(1) > #endpoint > .style-scope`;

class Login {
  async goto(page: PuppeteerInterface) {
    await page.func.goto("https://www.youtube.com/");
    await page.func.waitForSelector(links(EnumLink.Short));
  }
  async gotoShort(page: PuppeteerInterface) {
    await page.func.click(links(EnumLink.Short));
  }
  async gotoHome(page: PuppeteerInterface) {
    await page.func.click(links(EnumLink.Home));
  }
  async gotoDevelopment(page: PuppeteerInterface) {
    await page.func.click(links(EnumLink.Development));
  }
  async gotoHSubcrice(page: PuppeteerInterface) {
    await page.func.click(links(EnumLink.Subcrice));
  }
}

export default Login;
