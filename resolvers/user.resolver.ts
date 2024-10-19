import { generateRandomString } from "../helpers/generate";
import User from "../models/user.model";
import md5 from 'md5';

export const resolversUser = {
  Query: {
    getUser: async (_: any, args: any) => {
        const { id } = args

        const user = await User.findOne({
            _id: id,
            deleted: false,
        })

        if(!user) {
            return {
                code: 404,
                message: "User not found"
            }
        } else {
            return {
                code: 200,
                message: "Get user successfully",
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                token: user.token,
            }
        }
    }
  },


  Mutation:  {
    registerUser: async (_ : any, args: any) => {
      const { user } = args;

      const emailExist = await User.findOne({
        email: user.email,
        deleted: false,
      })

      if(emailExist) {
        return {
            code: 400,
            message: "Email already exists"
        }

      } else {
        user.password = md5(user.password)
        user.token = generateRandomString(30)

        const data = new User(user)
        await data.save();

        return {
            code: 200,
            message: "Register successfully",
            id: data.id,
            fullName: data.fullName,
            email: data.email,
            token: data.token,
        }
      }
    },
    loginUser: async (_ : any, args: any) => {
        const { email, password } = args.user

        const userExist = await User.findOne({
            email: email,
            deleted: false,
        })

        if(!userExist) {
            return {
                code: 400,
                message: "Email doesn't exist"
            }
        }

        if(md5(password) !== userExist.password) {
            return {
                code: 400,
                message: "Password is incorrect"
            }
        }

        return {
            code: 200,
            message: "Login successfully",
            id: userExist.id,
            fullName: userExist.fullName,
            email: userExist.email,
            token: userExist.token,
        }
    },
    updateUser: async (_ : any, args: any) => {
        const { id, user } = args;

        await User.updateOne({
            _id: id,
            deleted: false
        }, user)

        const record = await User.findOne({ _id: id})

        return record
    
    },
  },
};