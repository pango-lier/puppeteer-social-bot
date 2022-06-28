import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public crawler_id: number | null;

  @column()
  public user_created_id: number | null;

  @column()
  public type: string | null;

  @column()
  public name: string | null;

  @column()
  public tags: string | null;

  @column()
  public hag_tag: string | null;

  @column()
  public description: string | null;

  @column()
  public content: string | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
