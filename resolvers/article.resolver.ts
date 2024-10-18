import Article from "../models/article.model";
import Category from "../models/category.model";

export const resolversArticle = {
  Query: {
    getListArticle: async (_: any, args: any) => {
      const { sortKey, sortValue, currentPage, limitItem} = args;
      //Sort
      let sort: any = {};

      if(sortKey && sortValue) {
        sort[sortKey] = sortValue
      }
      //End Sort

      //Pagination
      const skip = (currentPage - 1) * limitItem
      //End Pagination
      const articles = await Article.find({
        deleted: false,
      }).sort(sort).limit(limitItem).skip(skip);   
   
      return articles;
    },

    getArticle: async (_ : any, args: any) => {
        const { id } = args;

        const article = await Article.findOne({
          _id: id,
          deleted: false,
        });
     ;
        return article;
    },
  },

  Article: { //Ghi giống bên type của typeDefs.ts
    category: async (article: any) => {     //Nó đang lập quan như for of
      const category = await Category.findOne({
        _id: article.categoryId,
        deleted: false
      })

      return category;
    } 
  },

  Mutation:  {
    createArticle: async (_ : any, args: any) => {
      const { article } = args;
      
      const record = new Article(article)
      await record.save();

      return record
    },
    deleteArticle: async (_ : any, args: any) => {
        const { id } = args;

        await Article.updateOne({
            _id: id,
        }, {
            deleted: true,
            deletedAt: Date.now()
        })

        return "Deleted successfully"
    },
    updateArticle: async (_ : any, args: any) => {
        const { id, article } = args;

        await Article.updateOne({
            _id: id,
            deleted: false
        }, article)

        const record = await Article.findOne({ _id: id})

        return record
    
    },
  },
};