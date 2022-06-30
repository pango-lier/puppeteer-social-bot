import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Target extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public account_id: number;

  @column()
  public type: string;

  @column()
  public url: string;

  @column()
  public name: string | null;

  @column()
  public description: string | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
