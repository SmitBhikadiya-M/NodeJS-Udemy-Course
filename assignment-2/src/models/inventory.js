const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
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
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

inventorySchema.methods.convertDateToGiventTZ = function(tz){
  const inventory = this;

  function convertTZ(date, timeZone){
    return new Date(date.toLocaleString('en-us', { timeZone }));
  }
  
  inventory.expiryTime = convertTZ(inventory.expiryTime, tz);
  inventory.manufacturingTime = convertTZ(inventory.manufacturingTime, tz);
  
  return inventory;
}

inventorySchema.statics.isTimeZoneValid = function(tz='america/chicago'){
  if(!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone){
    return false;
  }  
  try{
    Intl.DateTimeFormat(undefined, { timeZone: tz });
    return true;
  }catch(e){
    console.log("Invalid TimeZone Reuqest");
    return false;
  }

}

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;