import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "articles";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer("target_id")
        .unsigned()
        .references("id")
        .inTable("targets")
        .onDelete("CASCADE");
      table
        .integer("crawler_url_id")
        .unsigned()
        .references("id")
        .inTable("crawler_urls")
        .onDelete("CASCADE");
    });
  }
  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropForeign("target_id");
      table.dropColumn("target_id");
    });
  }
}
