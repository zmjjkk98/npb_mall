require("dotenv").config();

const express = require("express");
const app = express();
const { DB_PORT } = process.env;

//Router가져오기
const shoesRouter = require("./routes/products.router.js");

//몽고DB연결
const connect = require("./schemas");
connect();

//미들웨어
//req안에 body를 사용하기 위해 필요함
app.use(express.json());
app.use("/api", [shoesRouter]);

//포트 열어주기
app.listen(DB_PORT, () => {
  console.log(DB_PORT, "포트로 서버가 열렸어요!");
});
