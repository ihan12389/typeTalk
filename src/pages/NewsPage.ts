import { Page } from "../lib/Page";
import { NewsContainer } from "../container/NewsContainer";
import { Header } from "../components/news/Header";
import { Search } from "../components/news/Search";
import { Articles } from "../components/news/Articles";
import { Article } from "../components/news/Article";
import { Loading } from "../components/Loading";

var axios = require("axios").default;

class NewsPage extends Page {
  constructor({ router, datas }) {
    super(router);

    const container = new NewsContainer(null);
    new Header(container, router);
    new Search(container, this.searchContents);
    new Loading(container);

    this.render();
    this.mount();

    this.useAnother("japan")
      .then((list) => {
        this.reset();
        console.log(list);
        const container = new NewsContainer(null);
        new Header(container, router);
        new Search(container, this.searchContents);
        const books = new Articles(container, "독서");

        list[0].map((book) => {
          new Article(books, book.link, book.image, book.title, book.publisher);
        });

        const movies = new Articles(container, "영화");

        list[1].map((movie) => {
          new Article(
            movies,
            movie.link,
            movie.image,
            movie.title,
            movie.director
          );
        });
      })
      .then(() => {
        this.render();
        this.mount();
      })
      .catch((err) => console.log(err));
  }

  // 다른 API를 사용하여 뉴스 정보를 받아옵니다.
  useAnother = async (search) => {
    console.log("");
    try {
      if (search == "") {
        console.log("뭐라도 입력해요");
      } else {
        const {
          data: { books },
        } = await axios.get("https://typetalkserver.herokuapp.com/book", {
          params: {
            query: search,
          },
        });

        const {
          data: { movies },
        } = await axios.get("https://typetalkserver.herokuapp.com/movie", {
          params: {
            query: search,
          },
        });

        console.log(books, movies);
        return [books, movies];
      }
    } catch (error) {
      console.log(error);
    }
  };

  searchContents = (search) => {
    this.reset();

    const container = new NewsContainer(null);
    new Header(container, this.router);
    new Search(container, this.searchContents);
    new Loading(container);

    this.render();
    this.mount();

    this.useAnother(search)
      .then((list) => {
        this.reset();
        console.log(list);
        const container = new NewsContainer(null);
        new Header(container, this.router);
        new Search(container, this.searchContents);
        const books = new Articles(container, "독서");

        list[0].map((book) => {
          new Article(books, book.link, book.image, book.title, book.publisher);
        });

        const movies = new Articles(container, "영화");

        list[1].map((movie) => {
          new Article(
            movies,
            movie.link,
            movie.image,
            movie.title,
            movie.director
          );
        });
      })
      .then(() => {
        this.render();
        this.mount();
      })
      .catch((err) => console.log(err));
  };
}

export { NewsPage };
