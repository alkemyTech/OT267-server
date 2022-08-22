"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Activities",
      [
        {
          name: "Activity_1",
          content: "this is the activity-1",
          image: "Image-10208412904",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Activity_2",
          content: "this is the activity-2",
          image: "Image-3925293572938",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Activities", null, {});
  },
};
