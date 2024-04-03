import mongoose from "mongoose";

const Recipe = mongoose.Schema(
  {
    title: String,
    instructions: String,
    summary: String,
    creator: String,
    creator_email: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Recipe || mongoose.model("Recipe", Recipe);