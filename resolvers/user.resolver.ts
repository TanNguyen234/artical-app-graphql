import { generateRandomString } from "../helpers/generate";
import User from "../models/user.model";
import md5 from 'md5';

export const resolversUser = {
  Query: {
    getListArticle: async (_: any, args: any) => {
      
    
    },

    getArticle: async (_ : any, args: any) => {
       
    },
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
    deleteArticle: async (_ : any, args: any) => {
        const { id } = args;

        await User.updateOne({
            _id: id,
        }, {
            deleted: true,
            deletedAt: Date.now()
        })

        return "Deleted successfully"
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