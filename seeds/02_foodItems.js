exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("food_items")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("food_items").insert([
        { user_id: 1, item: "pasta", quantity: 2 },
        { user_id: 1, item: "tuna", quantity: 1 },
        { user_id: 1, item: "tomato", quantity: 3 },
        { user_id: 2, item: "milk", quantity: 1 },
        { user_id: 2, item: "cornflakes", quantity: 1 },
        { user_id: 3, item: "avocado", quantity: 3 },
        { user_id: 3, item: "salsa", quantity: 1 }
      ]);
    });
};
