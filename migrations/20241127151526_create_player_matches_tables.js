export function up(knex) {
  return knex.schema
    .createTable('players', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
    })
    .createTable('matches', (table) => {
      table.increments('id').primary();
      table.integer('year').notNullable();
      table.string('draw').notNullable();
      table.string('round').notNullable();
      table.integer('round_number').unsigned();
      table
        .integer('player1_id')
        .unsigned()
        .references('players.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('player2_id')
        .unsigned()
        .references('players.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
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
      table.string('score');
    });
}

export function down(knex) {
  return knex.schema.dropTable('matches').dropTable('players');
}
