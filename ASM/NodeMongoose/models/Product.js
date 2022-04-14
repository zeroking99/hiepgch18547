var mongoose = require('mongoose');

var Schema = mongoose.Schema;



var mongooseCN = 'mongodb+srv://123hiep123:a123456789@cluster0.qmzfx.mongodb.net/ASM2?retryWrites=true&w=majority'
mongoose.connect(mongooseCN);




const ProductSchema = new Schema({
    id: { type: Number },
    name: { type: String, required: true },
    color: { type: String },
    price: { type: Number },
    picURL: { type: String }

})

module.exports = mongoose.model('Product', ProductSchema);