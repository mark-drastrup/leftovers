exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, username: "Jess", password: "abcd1234" },
        { id: 2, username: "Michael", password: "lkjh9876" },
        { id: 3, username: "Janet", password: "wkod3645" }
      ]);
    });
};
