const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const Razorpay = require("razorpay");
require("dotenv").config();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const razorpayInstance = new Razorpay({
    key_id: process.env.KEY,
    key_secret: process.env.SECRET_KEY
});

app.post('/order', async (req, res) => {
    const options = {
        amount: req.body.amount,
        currency: req.body.currency,
        receipt: "any unique id for every order",
        payment_capture: 1
    };
    try {
        const response = await razorpayInstance.orders.create(options);
        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (err) {
        res.status(400).send('Not able to create order. Please try again!');
    }
});

const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
