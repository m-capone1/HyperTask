/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.table('card', (table) => {
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('id').inTable('user').onDelete('CASCADE');
    });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export async function down(knex) {
    return knex.schema.table('card', (table) => {
      table.dropForeign('user_id');
      table.dropColumn('user_id');
    });
  }