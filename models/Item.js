import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    bought: { type: Boolean, required: true },
}, {
    collection: 'items'
  });

export default mongoose.models.Item || mongoose.model('Item', ItemSchema);