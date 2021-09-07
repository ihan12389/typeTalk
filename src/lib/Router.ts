class Router {
  nowPage = "";
  pages = [];
  datas = [];

  constructor({ pages }) {
    this.pages = pages;
    /* set Hash Trigger */
    window.onhashchange = (event) => {
      this.nowPage = window.location.hash.replace("#", "");
      const page = this.pages.find((page) => page.path === this.nowPage);
      const Page = page.page;
      new Page({ router: this, datas: this.datas });
    };
  }

  /* Change Hash */
  push(pageName) {
    window.location.hash = pageName;
  }

  /* set Data for Page */
  setData(data) {
    this.datas = [];
    this.datas.push(data);
  }
}

export { Router };
