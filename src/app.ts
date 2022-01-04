import express, { Request, Response } from 'express';
import mysql from 'mysql';

const app = express();

const connectionString = process.env.DATABASE_URL || '';
const connection = mysql.createConnection(connectionString);
connection.connect();

/* Workout Playlist API
*  GET all workouts
*  GET workout by id
*  GET workouts by timerange
*  GET workouts by type
*  ADD a workout
*  UPDATE a workout
*  DELETE a workout
*/

app.get('/api/workouts', (req: Request, res: Response) => {
  res.send("This is where the workouts will be");
})

// Example: GET /api/workouts/1
app.get('/api/workouts/:workout_id', (req: Request, res: Response) => {
  console.log('get workout by id');
  const wid = req.params.workout_id;
  res.send("This will be workout " + wid);
})

app.get('/api/creators', (req: Request, res: Response) => {
  const query = `SELECT * FROM Creators`;
  connection.query(query, (err, rows) => {
    if (err) throw err;

    return res.send(rows);
  });
})

app.get('/api/creators/:creator_id', (req: Request, res: Response) => {
  const cid = req.params.creator_id;
  const query = `SELECT * FROM Creators WHERE creator_id = ${cid} LIMIT 1`;
  connection.query(query, (err, rows) => {
    if (err) throw err;

    return res.send(rows);
  });
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})