import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class CrawlerUrl extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public crawler_id: number;

  @column()
  public name: string | null;

  @column()
  public description: string | null;

  @column()
  public content: string | null;

  @column()
  public url: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
