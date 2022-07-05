import { PuppeteerActionFunc } from "App/Controllers/Service/Puppeteer/PuppeteerActionFunc";
import { Browser, Page } from "puppeteer";

export interface ISocial {
  url?: string;
  images?: Array<string>;
  video?: Array<string>;
  content: string;
  title?: string;
  hashTag?: string;
  type?: string;
  download?: boolean;
  profile?: IProfile;
}

export interface IProfile {
  userName?: string;
  password?: string;
}

export interface PuppeteerInterface {
  page: Page;
  browser: Browser;
  func: PuppeteerActionFunc;
}

