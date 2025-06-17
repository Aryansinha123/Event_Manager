import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);
