const client = require("./client.cjs");

const getActivities = async () => {
  try {
    const { rows } = await client.query(`
    SELECT * FROM activities;
    `);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const getOneActivity = async (activitiesId) => {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
    SELECT * FROM activities WHERE id = $1;
    `,
      [activitiesId]
    );
    return activity;
  } catch (error) {
    console.log(error);
  }
};

const plusOneActivity = async (activityName, activityDescription) => {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
      INSERT INTO activities (name, description)
      VALUES ($1, $2)
      RETURNING *;
    `,
      [activityName, activityDescription]
    );
    return activity;
  } catch (error) {
    console.log(error);
  }
};

const deleteActivity = async (activitiesId) => {
  try {
    await client.query(
      `
      DELETE FROM activities WHERE id = $1
    `,
      [activitiesId]
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getActivities,
  getOneActivity,
  plusOneActivity,
  deleteActivity,
};
