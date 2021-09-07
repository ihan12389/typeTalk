import { Page } from "../lib/Page";
import { NewsContainer } from "../container/NewsContainer";
import { Header } from "../components/news/Header";
import { Search } from "../components/news/Search";
import { Articles } from "../components/news/Articles";
import { Article } from "../components/news/Article";

var axios = require("axios").default;

class NewsPage extends Page {
  constructor({ router, datas }) {
    super(router);

    this.useAnother()
      .then((books) => {
        console.log(books);
        // 총 20개의 리스트를 받아옵니다.
        console.log(books);
        // 출력해보도록합시다.
        const container = new NewsContainer(null);
        new Header(container, router);
        new Search(container);
        const articles = new Articles(container, books);

        books.map((book) => {
          new Article(
            articles,
            book.link,
            book.image,
            book.title,
            book.publisher
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
  useAnother = async () => {
    console.log("");
    var search = "japan";
    try {
      if (search == "") {
        console.log("뭐라도 입력해요");
      } else {
        const {
          data: { items },
        } = await axios.get("http://localhost:3001/book", {
          params: {
            query: search,
          },
        });
        console.log(items);
        return items;
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export { NewsPage };
