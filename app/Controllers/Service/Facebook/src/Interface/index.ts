import { ISocial } from "Contracts/Social";

export interface IFanpage extends ISocial { }

export enum ECommentType {
  index = "index",
  random = "random",
}

export interface ICommentType {
  type: ECommentType;
  postRecentStart: number;
  postRecentEnd?: number;
}

export interface IComment extends ISocial { options?: ICommentType; }

export interface IGroup extends ISocial { }
