class Router {
  nowPage = "";
  pages = [];
  datas = [];

  constructor({ pages }) {
    this.pages = pages;
    window.onhashchange = (event) => {
      this.nowPage = window.location.hash.replace("#", ""); // 현재의 hash값
      const page = this.pages.find((page) => page.path === this.nowPage); // 현제 페이지 객체 탐색
      const Page = page.page; // 현재 페이지 객체가 가지고 있는 페이지 컴포넌트
      const currentPage = new Page({ router: this, datas: this.datas }); // 현재 페이지의 컴포넌트 객체 생성
    };
  }

  push(pageName) {
    window.location.hash = pageName;
  }

  setData(data) {
    this.datas = [];
    this.datas.push(data);
  }
}

export { Router };
