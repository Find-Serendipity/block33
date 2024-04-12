const express = require("express");
const app = express();
const {
  getRoutines,
  getOneRoutine,
  plusOneRoutine,
  deleteRoutine,
} = require("./db/routines.cjs");
const {
  getActivities,
  getOneActivity,
  plusOneActivity,
  deleteActivity,
} = require("./db/activities.cjs");
const {
  getRoutines_Activities,
  createRoutines_Activities,
} = require("./db/routines_activities.cjs");

const client = require("./db/client.cjs");
client.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("dist"));

app.get("/", (req, res, next) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

// GET /api/v1/routines - sends back all routines

app.get("/api/v1/routines", async (req, res, next) => {
  try {
    const allRoutines = await getRoutines();

    res.send(allRoutines);
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/routines/:routineId - sends back a specific routine based on the id that is passed in

app.get("/api/v1/routines/:routineId", async (req, res, next) => {
  try {
    const routineId = req.params.routineId;
    const oneRoutine = await getOneRoutine(routineId);

    res.send(oneRoutine);
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/routines - adds a new routine to the database and sends the newly added routine back

app.post("/api/v1/routines", async (req, res, next) => {
  try {
    const { name } = req.body;
    const { is_public } = req.body;
    const { goal } = req.body;
    const createRoutine = await plusOneRoutine(name, is_public, goal);
    res.send(createRoutine);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/v1/routines/:routineId - removes a routine from the database and sends a successful or failed message

app.delete("/api/v1/routines/:routineId", async (req, res, next) => {
  try {
    const routineId = req.params.routineId;
    const routineZapper = await deleteRoutine(routineId);

    res.send(routineZapper);
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/activities - sends back all activities

app.get("/api/v1/activities", async (req, res, next) => {
  try {
    const allActivities = await getActivities();

    res.send(allActivities);
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/activities/:activityId - sends back a specific activity based on the id that is passed in

app.get("/api/v1/activities/:activityId", async (req, res, next) => {
  try {
    const activityId = req.params.activityId;
    const oneActivity = await getOneActivity(activityId);

    res.send(oneActivity);
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/activities - adds a new activity to the database and sends the newly added activity back

app.post("/api/v1/activities", async (req, res, next) => {
  try {
    const { name } = req.body;
    const { description } = req.body;
    const createActivity = await plusOneActivity(name, description);
    res.send(createActivity);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/v1/activities/:activityId - removes an activity from the database and sends a successful or failed message

app.delete("/api/v1/activities/:activityId", async (req, res, next) => {
  try {
    const activityId = req.params.activityId;
    const activityZapper = await deleteActivity(activityId);

    res.send(activityZapper);
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/routines_activities - sends back all routines_activities combos
app.get("/api/v1/routines_activities", async (req, res, next) => {
  try {
    const combos = await getRoutines_Activities();

    res.send(combos);
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/routines_activities/ - adds a new routines_activities to the database and sends the newly added routines_activities back

app.post("/api/v1/routines_activities", async (req, res, next) => {
  try {
    const { routines_id } = req.body;
    const { activities_id } = req.body;
    const createActivity = await createRoutines_Activities(
      routines_id,
      activities_id
    );
    res.send(createActivity);
  } catch (err) {
    next(err);
  }
});

// I borrowed these errors handlers from lecture

app.use((req, res) => {
  res.status(404).send({
    error: "404 - Not Found",
    message: "The director is looking for you, better get backstage!",
  });
});

app.use((error, req, res, next) => {
  console.log(`SERVER ERROR`, error);
  res.status(500).send({ name: error.name, message: error.message });
});

app.listen(3000, () => console.log(`QUIET BACKSTAGE PLEASE`));
