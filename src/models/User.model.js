import mongoose from "mongoose";

const schema = {
  username: {
    type: String,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
  is_logged_in: {
    type: Boolean,
    default: false,
  },
};

const UserSchema = new mongoose.Schema(schema);

export default mongoose.models.UserSchema ||
  mongoose.model("Users", UserSchema);
