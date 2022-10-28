const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/keys");
const bodyParser = require("body-parser");

const customers = require("./routes/api/customers");
const products = require("./routes/api/products");
const orders = require("./routes/api/orders");

const app = express();

mongoose
    .connect(db.mongoURI, { useNewUrlParser: true })

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status(400).send("Please enter a valid path");
});

app.use("/api/customers", customers)
app.use("/api/products", products)
app.use("/api/orders", orders)

const port = 5000;

app.listen(port, () => console.log(`listening to port ${port}`));

