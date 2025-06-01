import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db.js";
const app = express();
import dotenv from "dotenv"; 
dotenv.config({});



// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { 
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});

// mongo pass LIy6hJdGsK5kfrUX