import { Tblog } from "./blogs";

export interface TblogCate {
    _id?: string,
    name: string,
    slug: string ,
    news: Tblog[];
}
export type NewsCate = {
    catenew: TblogCate;
    news: Tblog[];
  };
export interface userErr {
    error: "string"
}