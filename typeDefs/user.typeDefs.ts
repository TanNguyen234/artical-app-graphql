import { gql } from "apollo-server-express";

export const typeDefsUser = gql`
    type User {        #Định kiểu trường nào có thể lấy
      id: ID,
      fullName: String,
      email: String,
      token: String,
      code: Int,
      message: String
    }

    # type Query {
    #   getListArticle(
    #     sortKey: String, 
    #     sortValue: String,
    #     currentPage: Int = 1,
    #     limitItem: Int = 2,
    #     filterKey: String,
    #     filterValue: String,
    #     keyword: String
    #   ): [User],

    #   getArticle(id: ID): Article
    # }

    input RegisterUserInput {    #Định kiểu gửi
      fullName: String,
      email: String,
      password: String,
    }

    type Mutation {             
      registerUser(user: RegisterUserInput): User
      deleteUser(id: ID): String
      updateUser(id: ID, user: RegisterUserInput): User
    }
`;