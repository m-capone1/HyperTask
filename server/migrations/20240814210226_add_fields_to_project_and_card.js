/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .table("project", (table) => {
      table.text("description");
      table.date("start_date");
      table.date("end_date");
    })
    .table("card", (table) => {
      table.integer("story_points").unsigned();
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .table("project", (table) => {
      table.dropColumn("description");
      table.dropColumn("start_date");
      table.dropColumn("end_date");
    })
    .table("card", (table) => {
      table.dropColumn("story_points");
    });
}