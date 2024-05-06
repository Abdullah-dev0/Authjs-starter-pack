import { model, models, Schema } from "mongoose";
export const userSchema = new Schema(
   {
      username: {
         type: String,
         // required: true,
         unique: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
      image: {
         type: String,
         default: null,
      },
      emailVerified: {
         type: Boolean,
         default: false,
      },
   },
   {
      timestamps: true,
   }
);

const User = models?.User || model("User", userSchema);

export default User;
