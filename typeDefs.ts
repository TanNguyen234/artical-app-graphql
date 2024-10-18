import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Article {        #Định kiểu trường nào có thể lấy
      id: ID,
      title: String,
      avatar: String,
      description: String,
      category: Category
    } 

    type Category {        #Định kiểu trường nào có thể lấy
      id: ID,
      title: String,
      avatar: String
    } 

    type Query {
      getListArticle: [Article],
      getArticle(id: ID): Article,
      getListCategory: [Category],
      getCategory(id: ID): Category
    }

    input ArticleInput {    #Định kiểu gửi
      title: String,
      avatar: String,
      description: String,
      categoryId: String,
    }

    input CategoryInput {    #Định kiểu gửi
      title: String,
      avatar: String
    }

    type Mutation {            
      createArticle(article: ArticleInput): Article
      deleteArticle(id: ID): String
      updateArticle(id: ID, article: ArticleInput): Article

      createCategory(category: CategoryInput): Category
      deleteCategory(id: ID): String
      updateCategory(id: ID, category: CategoryInput): Category
    }
`;