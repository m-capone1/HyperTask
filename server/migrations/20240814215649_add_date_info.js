/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
      .table('project', (table) => {
        table.date('start_date').nullable();
        table.date('end_date').nullable();
      });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export function down(knex) {
    return knex.schema
      .table('project', (table) => {
        table.dropColumn('start_date');
        table.dropColumn('end_date');
      });
  }
