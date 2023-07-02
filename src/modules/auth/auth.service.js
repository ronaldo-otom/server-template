import mongoose from "mongoose";
import UserSchema from "../../models/User.model.js";
import { compare, encrypt } from "../../utils/helpers/hash.js";
import { generateTokens } from "../../utils/helpers/token.js";

export default class AuthService {
  async AddUser({ username, password }) {
    try {
      if (username && password) {
        const passwordEncrypted = await encrypt(password);
        const response = await UserSchema.create({
          username,
          password: passwordEncrypted,
        });
        if (response?._id) {
          return { message: "Success", status: 200 };
        }
      } else {
        return { message: "Username and Password Required", status: 401 };
      }
    } catch (error) {
      return error.message;
    }
  }

  async UserLogin({ username, password }) {
    try {
      if (username && password) {
        const response = await UserSchema.findOne(
          { username },
          { password: 1 }
        );
        if (response?.password) {
          const comparePassword = await compare(password, response.password);
          if (comparePassword) {
            const _id = new mongoose.Types.ObjectId(response._id);
            await UserSchema.findByIdAndUpdate(_id, { is_logged_in: true });
            const tokens = await generateTokens(response._id);
            return { ...tokens, message: "Success", status: 200 };
          } else {
            return { message: "Invalid Credentials", status: 401 };
          }
        } else {
          return { message: "Something Went Wrong", status: 500 };
        }
      } else {
        return { message: "Username and Password Required", status: 401 };
      }
    } catch (error) {
      return error.message;
    }
  }
}
