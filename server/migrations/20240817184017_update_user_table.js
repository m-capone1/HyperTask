export function up(knex) {
    return knex.schema.table('user', function(table) {
        table.dropColumn('name');

        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('password').notNullable();
    });
}
  
export function down(knex) {
    return knex.schema.table('user', function(table) {
        table.string('name').nullable();
    
        table.dropColumn('first_name');
        table.dropColumn('last_name');
        table.dropColumn('password');
    });
}