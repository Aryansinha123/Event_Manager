import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    numberOfTickets: { type: Number, required: true }, // New field
    additionalDetails: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
