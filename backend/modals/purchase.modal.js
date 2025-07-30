import mongoose from "mongoose";
3;
const purchaseScehma = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  courseId: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
  },
});
export const Purchase = mongoose.model("Purchase", purchaseScehma);
