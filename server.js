// 네이버 뉴스 API를 위한 서버사이드 페이지 입니다.
const express = require("express");
const app = express();
// express에서 cors를 허용하기 위해 cors를 다운
const cors = require("cors");
// POST request data의 body로부터 파라미터를 편리하게 추출하기 위해 bodyParser 다운
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
console.log(port);
const axios = require("axios");

const ID_KEY = "CDUOYM94pFl3LawMiITU";
const SECRET_KEY = "LhH0rktPN_";

app.use(cors());
app.use(bodyParser.json());

app.use("/book", (req, res) => {
  const word = req.query.query;
  axios
    .get("https://openapi.naver.com/v1/search/book.json", {
      params: {
        query: word,
        display: 20,
      },
      headers: {
        "X-Naver-Client-Id": ID_KEY,
        "X-Naver-Client-Secret": SECRET_KEY,
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then(function (response) {
      const items = response.data.items;
      // 서버 밖으로 내보냅니다.
      res.send({ items: items });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
