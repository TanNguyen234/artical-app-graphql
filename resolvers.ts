import Artical from "./models/artical.model";

export const resolvers = {
  Query: {
    hello: () => {
      return "Hello World!";
    },

    getListArticle: async () => {
      const articles = await Artical.find({
        deleted: false,
      });
   ;
      return articles;
    },

    getArticle: async (_ : any, args: any) => {
        const { id } = args;
        
        const article = await Artical.findOne({
          _id: id,
          deleted: false,
        });
     ;
        return article;
    },
  },
};
