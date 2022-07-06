const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      trim: true,
      required: true,
    },
    expiryTime: {
      type: Date,
      required: true,
    },
    quantity: {
      type: Number,
      min: 1,
      default: 1,
    },
    manufacturingTime: {
      type: Date,
    },
    inventoryImage: {
      type: Buffer,
    },
    ownerId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true,
  }
);

const Inventory = new mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
