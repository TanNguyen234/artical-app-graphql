import { gql } from "apollo-server-express";

export const typeDefsArticle = gql`
    type Article {        #Định kiểu trường nào có thể lấy
      id: ID,
      title: String,
      avatar: String,
      description: String,
      category: Category
    }

    type Query {
      getListArticle(
        sortKey: String, 
        sortValue: String,
        currentPage: Int = 1,
        limitItem: Int = 2,
        filterKey: String,
        filterValue: String
      ): [Article],

      getArticle(id: ID): Article
    }

    input ArticleInput {    #Định kiểu gửi
      title: String,
      avatar: String,
      description: String,
      categoryId: String,
    }

    type Mutation {            
      createArticle(article: ArticleInput): Article
      deleteArticle(id: ID): String
      updateArticle(id: ID, article: ArticleInput): Article
    }
`;