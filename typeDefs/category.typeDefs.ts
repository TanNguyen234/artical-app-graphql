import { gql } from "apollo-server-express";

export const typeDefsCategory = gql`
    type Category {        #Định kiểu trường nào có thể lấy
      id: ID,
      title: String,
      avatar: String
    } 

    type Query {
      getListCategory: [Category],
      getCategory(id: ID): Category
    }

    input CategoryInput {    #Định kiểu gửi
      title: String,
      avatar: String
    }

    type Mutation {            
      createCategory(category: CategoryInput): Category
      deleteCategory(id: ID): String
      updateCategory(id: ID, category: CategoryInput): Category
    }
`;