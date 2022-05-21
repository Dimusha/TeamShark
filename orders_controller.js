//load express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.json());

require("./Order_model");
const Order = mongoose.model("Orders") 

//database connection
mongoose.connect("mongodb+srv://dimusha:dimusha123@orders-service.tw7uh.mongodb.net/?retryWrites=true&w=majority", () => {
    console.log("Database connected!!");
})

app.get('/', (req,res) => {
res.send("This is our orders page");
})

//Create order function
app.post("/order", (req,res) => {
    var newOrder = {
        id: req.body.id,
        name: req.body.name,
        status: req.body.status,
        qty: req.body.qty,
        price: req.body.price
    }

    var order = new Order(newOrder)

    order.save().then(() => {
        console.log("New order created!")
    }).catch((err) => {
        if(err){
            throw err;
        }
    })

    res.send("Successfully created an order!")
})


//List all the orders
app.get("/orders", (req,res) => {
    Order.find().then((Orders) => {
        res.json(Orders)
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

//List a specific order
app.get("/order/:id", (req,res) => {
    Order.findById(req.params.id).then((order) => {

        if(order){
            res.json(order);
        }else{
            res.sendStatus(404);
        }
        
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

//Delete an order
app.delete("/order/:id", (req,res) => {
    Order.findOneAndRemove(req.params.id).then(() => {
        res.send("Order deleted successfully!")
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

app.listen(4001, () => {
console.log("Server is up and running!");
})

//CI/CD pipeline
//final testing