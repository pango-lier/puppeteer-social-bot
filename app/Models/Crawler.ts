import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Crawler extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string | null;

  @column()
  public tags: string | null;

  @column()
  public links: string;

  @column()
  public type: string;

  @column()
  public description: string | null;

  @column()
  public account_id: number | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
