const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectID, ref: 'User', required: true},
    items: [{
        productData: {type: Object, required: true},
        amount: {type: Number, required:true}
    }]
});

module.exports = mongoose.model('Order', orderSchema);