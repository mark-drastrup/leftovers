exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("food_items")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("food_items").insert([
        { id: 1, user_id: 1, item: "pasta", quantity: 2 },
        { id: 2, user_id: 1, item: "tuna", quantity: 1 },
        { id: 3, user_id: 1, item: "tomato", quantity: 3 },
        { id: 4, user_id: 2, item: "milk", quantity: 1 },
        { id: 5, user_id: 2, item: "cornflakes", quantity: 1 },
        { id: 6, user_id: 3, item: "avocado", quantity: 3 },
        { id: 7, user_id: 3, item: "salsa", quantity: 1 }
      ]);
    });
};
