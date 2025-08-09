import dotenv from "dotenv";
import express from "express";
import app from "./src/app"
dotenv.config()

app.set("port", process.env.PORT || 3000);



app.listen(process.env.PORT, () => {
    console.log("hi")
})