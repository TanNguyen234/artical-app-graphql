import Article from "./models/article.model";

export const resolvers = {
  Query: {
    getListArticle: async () => {
      const articles = await Article.find({
        deleted: false,
      });
   
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
    }
  } 
};
