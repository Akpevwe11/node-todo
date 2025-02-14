import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import todoRoutes from "./routes/todos.js"; 

dotenv.config();

const app = express();


app.use(bodyParser.json());
app.use("/api/v1/todos", todoRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
