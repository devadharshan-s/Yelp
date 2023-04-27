//Enviroinment vars import.
require("dotenv").config();
const cors = require("cors");
//Morgan middleware for login.
//const morgan = require('morgan')

//entry point of backend.
const express = require("express");

 //Connecting db w express.
const db = require('./db/index.js')
 //Creating instance of Express.
 const app = express();
 /*Middleware.
 // app.use((req,res, next) => {
 //      console.log("Middleware is running");
 //      next();
 });
 */

//Cors api handler.
app.use(cors());

//Middleware for post request helps add user input.
app.use(express.json());


 //Creating API

 //Retrieval #1(all restaurants).
 app.get("/api/v1/Restaurants", async (req, res) => {
     try{
         // const result = await db.query("select * from restaurants");
         const restaurantRatingsData = await db.query(
             "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;"
         );
         console.log('restaurant data', restaurantRatingsData)
         //Sending back in json format.
         res.status(200).json({
             status: "success",
             results: restaurantRatingsData.rows.length,
             restaurants: restaurantRatingsData.rows
         });
     }
     catch(err){
         console.log(err);
     }
 });

 //Retrieval #2(Select restaurant).
 app.get("/api/v1/Restaurants/:id", async (req, res) => {
     console.log(req.params.id);
     try {
         const results = await db.query("select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1",
             [req.params.id,
         ]);
         const reviews = await db.query("select * from reviews where restaurant_id = $1", [
             req.params.id,
         ]);
         res.status(200).json({
             status:"success",
             restaurant: results.rows[0],
             reviews:reviews.rows
         });
     }
     catch (e){
         console.log(e);
     }
     }
 );

 //Create
 app.post("/api/v1/Restaurants", async (req, res) => {
     try{
        const results = await db.query(
            "INSERT INTO restaurants (name, location, price_range) values($1, $2, $3) returning *",
            [req.body.name, req.body.location, req.body.price_range]
        );
         console.log(results);
         console.log(req.body);
         res.status(203).json({
             status: "success",
             restaurants: results.rows[0],
         });
     }
     catch(err){
         console.log(err);
     }
 });

 //Update
app.put("/api/v1/Restaurants/:id", async (req, res) => {
    try{
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
            [req.body.name, req.body.location, req.body.price_range, req.params.id]
        );
        console.log(results);
        // console.log(req.body);
        res.status(200).json({
            status : "success",
            restaurant: results.rows[0],
        });
    }
    catch (err){
        console.log(err);
    }
});

app.delete("/api/v1/Restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("DELETE FROM restaurants where id = $1 returning *",[req.params.id]);
        console.log(results);
        res.status(204).json({
            status : "success",
        });
    }
    catch (err){
        console.log(err);
    }
});

app.post("/api/v1/Restaurants/:id/addReview",async (req,res) => {
    try{
        const newReview = await db.query("INSERT INTO reviews(restaurant_id, name, review, rating) VALUES ($1,$2,$3,$4) returning *;",[
            req.params.id,req.body.name,req.body.review,req.body.rating]
        );
        console.log(newReview);
        res.status(201).json({
            status:"success",
            review:newReview.rows[0]
        })
    }
    catch(e){
        console.log(e);
    }
});

 //Listening on port.
 const port = process.env.PORT || 3001;
 app.listen(port, () => {
     console.log(`Server is listening on port ${port}`);
 });