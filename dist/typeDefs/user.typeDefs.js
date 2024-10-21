"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsUser = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefsUser = (0, apollo_server_express_1.gql) `
    type User {        #Định kiểu trường nào có thể lấy
      id: ID,
      fullName: String,
      email: String,
      token: String,
      code: Int,
      message: String
    }

    type Query {
      getUser: User,
    }

    input RegisterUserInput {    #Định kiểu gửi
      fullName: String,
      email: String,
      password: String,
    }

    input LoginUserInput {    #Định kiểu gửi
      email: String,
      password: String
    }

    type Mutation {             
      registerUser(user: RegisterUserInput): User
      loginUser(user: LoginUserInput): User
      updateUser(id: ID, user: RegisterUserInput): User
    }
`;
