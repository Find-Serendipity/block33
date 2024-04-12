const client = require("./client.cjs");

const getRoutines_Activities = async () => {
  try {
    const { rows } = await client.query(`
    SELECT * FROM routines_activities;
    `);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const createRoutines_Activities = async (routines_id, activities_id) => {
  try {
    const {
      rows: [newActivity],
    } = await client.query(
      `
      INSERT INTO routines_activities (routines_id, activities_id)
      VALUES ($1, $2)
      RETURNING *;
    `,
      [routines_id, activities_id]
    );
    return newActivity;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getRoutines_Activities,
  createRoutines_Activities,
};
