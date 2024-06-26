const client = require("./client.cjs");

const getRoutines = async () => {
  try {
    const { rows } = await client.query(`
    SELECT * FROM routines;
    `);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const getOneRoutine = async (routineId) => {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
    SELECT * FROM routines WHERE id = $1;
    `,
      [routineId]
    );
    return routine;
  } catch (error) {
    console.log(error);
  }
};

const plusOneRoutine = async (routineName, routinePublic, routineGoal) => {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      INSERT INTO routines (name, is_public, goal)
      VALUES($1, $2, $3)
      RETURNING *;
    `,
      [routineName, routinePublic, routineGoal]
    );
    return routine;
  } catch (error) {
    console.log(error);
  }
};

const deleteRoutine = async (routineId) => {
  try {
    await client.query(
      `
      DELETE FROM routines WHERE id = $1
    `,
      [routineId]
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getRoutines,
  getOneRoutine,
  plusOneRoutine,
  deleteRoutine,
};
