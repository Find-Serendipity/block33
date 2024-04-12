const client = require("./client.js");
const { plusOneRoutine } = require("./routines.cjs");
const { plusOneActivity } = require("./activities.cjs");
const { createRoutines_Activities } = require("./routines_activities.cjs");

const createTables = async () => {
  try {
    await client.query(`
    CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        is_public BOOLEAN NOT NULL,
        goal INTEGER
      );
      
      CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        description TEXT NOT NULL
      );

      CREATE TABLE routines_activities (
        id SERIAL PRIMARY KEY,
        routines_id INTEGER REFERENCES routines(id),
        activities_id INTEGER REFERENCES activities(id)
      );
    `);
  } catch (err) {
    console.log(err);
  }
};

const dropTables = async () => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS routines_activities;
      DROP TABLE IF EXISTS routines;
      DROP TABLE IF EXISTS activities;
    `);
  } catch (error) {
    console.log(error);
  }
};

const syncNSeed = async () => {
  await client.connect();
  console.log(`CURTAINS IN FIVE`);

  await dropTables();
  console.log(`NO SNACKS BACKSTAGE, JESSICA!`);

  await createTables();
  console.log(`PAIN IS TEMPORARY, FAME IS FOREVER`);

  const tango = await plusOneRoutine("Topsy Tango", "true", 30);
  const circuit = await plusOneRoutine("Circuit Salsa", "false", 1);
  const romantic = await plusOneRoutine("Royal Rumba", "true", 40);
  const fox = await plusOneRoutine("Foxx Trot", "true", 10);
  const cha = await plusOneRoutine("Cha Cha Slide", "true", 20);
  console.log(`YOUR DANCES ARE`, circuit, fox, romantic, tango, cha);

  const promenade = await plusOneActivity(
    "Promenade",
    "The promenade position is defined as a V-shaped dance position whereby the man and lady travel in the same direction, toward the open end of the V."
  );
  const forward = await plusOneActivity(
    "Basic Forward",
    "The forward basic step is a combination of two walks followed by a chasse, to the count of `Slow, Slow, Quick, Quick`."
  );
  const turn = await plusOneActivity(
    "Natural Turn",
    "The Natural Turn is a simple figure consisting of six steps that turns to the right and progresses generally down line of dance."
  );
  const spin = await plusOneActivity(
    "Top Spin",
    "The top spin is a move that involves upper body rotation on the trail foot, followed by a step back."
  );
  const alemana = await plusOneActivity(
    "Alemana",
    "The leader dances the footwork for a backwards basic while the follower dances the footwork for a spot turn under the single pair of joined arms."
  );
  console.log(`YOUR MOVES ARE`, promenade, forward, turn, spin, alemana);

  const swinging = await createRoutines_Activities(fox.id, turn.id);
  const sliding = await createRoutines_Activities(romantic.id, alemana.id);
  const spinning = await createRoutines_Activities(fox.id, promenade.id);
  const sashaying = await createRoutines_Activities(tango.id, spin.id);
  const sweeping = await createRoutines_Activities(cha.id, turn.id);
  console.log(
    `COMBINE THE FOLLOWING DANCES AND MOVES:`,
    swinging,
    sliding,
    spinning,
    sashaying,
    sweeping
  );

  await client.end();
  console.log(`NOW 5, 6, 7 AND...`);
};

syncNSeed();
