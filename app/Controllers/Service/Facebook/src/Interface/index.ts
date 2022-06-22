import { Browser, Page } from "puppeteer";
import { PuppeteerActionFunc } from "../../../Puppeteer/PuppeteerActionFunc";

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
  page: Page;
  browser: Browser;
  func: PuppeteerActionFunc;
}

export enum ECommentType {
  index = "index",
  random = "random",
}

export interface ICommentType {
  type: ECommentType;
  postRecentStart: number;
  postRecentEnd?: number;
}
export interface CommentInterface {
  url: string;
  content: string;
  images?: string[];
  type?: ICommentType;
}

export interface GroupInterface {
  url: string;
  content: string;
  images?: string[];
  user?: Profile;
}
