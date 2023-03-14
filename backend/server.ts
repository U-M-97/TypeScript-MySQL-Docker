import express, { Express, Request, Response } from "express";
import dotenv from "dotenv" 
const app: Express = express()
dotenv.config({path:'.env'})        
const port: string = `${process.env.port}` || "4000"
import cors from "cors"
app.use(cors());
import user from "./routers/user"
import { dbConnect } from "./dbConnect";

dbConnect()

app.use(express.json())
app.use("/api", user)

app.listen(port, () => {        
    console.log("Server is running on port " , port)
})          