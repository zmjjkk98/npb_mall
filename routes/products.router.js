const express = require("express");
const router = express.Router();

//Create
const Shoes = require("../schemas/products.schema.js");
router.post("/products", async (req, res) => {
  const { shoesId, name, brand, price } = req.body;

  if (!shoesId || !name || !brand || !price) {
    res.status(400).json({ errormessage: "데이터 형식이 올바르지 않습니다." });
  }

  //DB접근
  const createShoes = await Shoes.create({ shoesId, name, brand, price });
  res.json({ shoes: createShoes });
});

//Read
//전체 상품 조회
router.get("/products", async (req, res) => {
  const shoes = await Shoes.find({});
  res.json({ shoes: shoes });
});

//상품 상세 정보
//TODO: shoesId 붙여야되는 이유?
router.get("/product/:shoesId", async (req, res) => {
  const shoesId = req.params.shoesId;
  const product = await Shoes.findOne({ shoesId });
  if (!product) {
    return res.status(404).json({ message: "상품 조회에 실패하였습니다." });
  } else return res.status(200).json({ data: product });
});

//Update
router.put("/products/:shoesId", async (req, res) => {
  //파라미터로 넘어온 변경하고 싶은 shoes Id
  const { shoesId, name, brand, price } = req.body;
  const existsShoes = await Shoes.find({ shoesId });

  if (!shoesId || !name || !brand || !price) {
    res.status(400).json({ errormessage: "데이터 형식이 올바르지 않습니다." });
  }
  if (existsShoes.length) {
    await Shoes.updateOne({ shoesId: shoesId }, { $set: { shoesId: shoesId, name: name, brand: brand, price: price } });
  } else return res.status(404).json({ message: "상품 조회에 실패하였습니다." });

  res.status(200).json({ message: "상품 수정 완료" });
});

//Delete
router.delete("/products/:shoesId", async (req, res) => {
  const { shoesId } = req.params;

  const existsShoes = await Shoes.find({ shoesId });
  if (existsShoes.length > 0) {
    await Shoes.deleteOne({ shoesId });
  } else return res.status(404).json({ message: "상품 조회에 실패하였습니다." });

  res.json({ result: "success" });
});

module.exports = router;
