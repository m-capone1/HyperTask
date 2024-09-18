/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable("user", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable().unique();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .createTable("project", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("id").inTable("user").onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .createTable("card", (table) => {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.text("description");
      table.enu("category", ["To Do", "In Progress", "In Review", "Completed"]).notNullable();
      table.integer("project_id").unsigned().notNullable();
      table.foreign("project_id").references("id").inTable("project").onDelete("CASCADE");
      
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("id").inTable("user").onDelete("CASCADE");

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .dropTableIfExists("card")
    .dropTableIfExists("project")
    .dropTableIfExists("user");
}