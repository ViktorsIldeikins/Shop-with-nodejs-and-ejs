const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: false},
    email: {type: String, required: false},
    password: {type: String, required: true},
    cart: {items: [{
        productId:{ type: mongoose.Schema.Types.ObjectID, ref:'Product', required:true},
        amount: {type: Number, required:true}
        }]
    }
});

userSchema.methods.addToCart = function(product) {
    const index = this.cart.items.findIndex(val => val.productId.toString() === product.id.toString());
    if (index >= 0) {
        const productToUpdate = this.cart.items[index];
        productToUpdate.amount ++;
    } else {
        this.cart.items.push({productId: product._id, amount:1});
    }
    this.save();
};

userSchema.methods.removeFromCart = function(id) {
    const index = this.cart.items.findIndex( val => val.productId.toString() === id.toString());
    if (index >=0 ) {
        this.cart.items.splice(index, 1);
    }
    return this.save();
};

userSchema.methods.clearCart = function() {
    this.cart.items = [];
    return this.save();
};

module.exports = mongoose.model('User', userSchema);