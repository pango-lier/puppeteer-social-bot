import { Browser, Page } from "puppeteer";
import { PuppeteerActionFunc } from "../puppeteer/actionFunc";

export interface FanpageInterface {
  url: string;
  content: string;
  images?: string[];
  user?: Profile;
}

export interface Profile {
  userName: string;
  password: string;
}

export interface PuppeteerInterface {
  page?: Page;
  browser?: Browser;
  func: PuppeteerActionFunc;
}
