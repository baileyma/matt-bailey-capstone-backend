export function up(knex) {
  return knex.schema
    .createTable('players', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
    })
    .createTable('matches', (table) => {
      table.increments('id').primary();
      table.string('score').notNullable();
      table
        .integer('winner_id')
        .unsigned()
        .references('players.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('loser_id')
        .unsigned()
        .references('players.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('draw').notNullable();
      table.string('round').notNullable();
      table.integer('round_number').unsigned();
      table.integer('year').notNullable();
      table.timestamp('created_at').default(knex.fn.now());
    });
}

export function down(knex) {
  return knex.schema.dropTable('matches').dropTable('players');
}
