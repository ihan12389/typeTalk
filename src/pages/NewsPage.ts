import { Page } from "../lib/Page";
import { NewsContainer } from "../container/NewsContainer";
import { Container } from "../components/profile/Container";
import { Header } from "../components/news/Header";
import { Search } from "../components/news/Search";
import { Articles } from "../components/news/Articles";
import { Article } from "../components/news/Article";

class NewsPage extends Page {
  constructor({ router, datas }) {
    super(router);

    var url =
      "https://newsapi.org/v2/top-headlines?" +
      "country=kr&" +
      "from=2021-09-07&" +
      "sortBy=popularity&" +
      "apiKey=9a602978a699466fba910d21cbd52c9d";

    var req = new Request(url);

    fetch(req)
      .then(function (res) {
        // 원하는 기사의 리스트를 받아옵니다.
        return res.json();
      })
      .then((news) => {
        // 총 20개의 리스트를 받아옵니다.
        console.log(news);
        // 출력해보도록합시다.
        const container = new NewsContainer(null, news.articles);
        new Header(container, router);
        new Search(container);
        const articles = new Articles(container, news.articles);

        news.articles.map((article) => {
          var arr = article.title.split(" - ");
          var title = arr[0];
          var from = arr[arr.length - 1];

          new Article(articles, article.url, article.urlToImage, title, from);
        });
      })
      .then(() => {
        this.render();
        this.mount();
      })
      .catch((err) => console.log(err));
  }
}

export { NewsPage };
