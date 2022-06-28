import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "articles";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("crawler_id")
        .unsigned()
        .references("id")
        .inTable("crawlers")
        .onDelete("CASCADE");
      table.string("type");
      table.string("name");
      table.string("tags");
      table.string("hag_tag");
      table.string("description");
      table.string("content");
      table
        .integer("user_created_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
