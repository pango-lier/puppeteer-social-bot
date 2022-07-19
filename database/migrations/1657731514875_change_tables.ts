import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.alterTable('crawler_urls', (table) => {
      // table.dropNullable('crawler_id');
      // table.string('mode');
    })
    this.schema.alterTable('videos', (table) => {
      table
        .integer("article_id")
        .unsigned()
        .references("id")
        .inTable("articles")
        .onDelete("CASCADE");
    })
    this.schema.alterTable('images', (table) => {
      table
        .integer("article_id")
        .unsigned()
        .references("id")
        .inTable("articles")
        .onDelete("CASCADE");
    })
  }

  public async down() {
  }
}
