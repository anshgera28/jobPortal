import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db.js";
import userRoutes from "./routes/user.route.js";
const app = express();
import dotenv from "dotenv"; 
import companyRoutes from "./routes/company.route.js";
import jobRoutes from "./routes/job.route.js";
import applicationRoutes from "./routes/application.route.js";

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

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);

app.listen(PORT, () => { 
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});

// mongo pass LIy6hJdGsK5kfrUX