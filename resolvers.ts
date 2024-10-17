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
  },
};
