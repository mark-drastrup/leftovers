exports.up = function(knex) {
  return knex.schema.createTable("food_items", t => {
    t.increments().index();
    t.integer("user_id").notNullable();
    t.foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("cascade");
    t.text("item");
    t.integer("quantity").notNullable();
    t.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("jams");
};
