const mongoose = require("mongoose");

mongoose.model("Orders", {
    id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    qty: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
    
})