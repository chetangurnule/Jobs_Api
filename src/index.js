import "dotenv/config";
import { app } from "./app.js";
import { dbConnection } from "./db/dbConnection.js";

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await dbConnection();
    app.listen(port, (req, res) => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
