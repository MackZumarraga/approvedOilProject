const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const customers = require("./routes/api/customers");
const products = require("./routes/api/products");
const orders = require("./routes/api/orders");
const Customer = require("./models/Customer");
const bodyParser = require("body-parser");

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to mongo db'))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello poopie!")
});

app.use("/api/customers", customers)
app.use("/api/products", products)
app.use("/api/orders", orders)

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`Listening on port ${port}`)});

