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
    })
    .createTable('draw', (table) => {
      table.increments('id').primary();
      table.integer('year').unsigned();
      table
        .integer('match1player1')
        .unsigned()
        .references('players.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('match1player2')
        .unsigned()
        .references('players.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('match2player1')
        .unsigned()
        .references('players.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('match2player2')
        .unsigned()
        .references('players.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('match3player1')
        .unsigned()
        .references('players.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('match3player2')
        .unsigned()
        .references('players.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('match4player1')
        .unsigned()
        .references('players.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('match4player2')
        .unsigned()
        .references('players.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
}

export function down(knex) {
  return knex.schema
    .dropTable('draw')
    .dropTable('matches')
    .dropTable('players');
}
