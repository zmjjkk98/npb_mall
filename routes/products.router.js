const express = require("express");
const router = express.Router();

//Create
const Shoes = require("../schemas/products.schema.js");
router.post("/shoes", async (req, res) => {
  const { shoesId, name, brand, price } = req.body;

  const shoes = await Shoes.find({ shoesId });

  if (shoes.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 존재하는 ShoesId 입니다.",
    });
  }

  //DB접근
  const createShoes = await Shoes.create({ shoesId, name, brand, price });
  res.json({ shoes: createShoes });
});

//Read
router.get("/shoes", async (req, res) => {
  const shoes = await Shoes.find({});
  res.json({ shoes: shoes });
});

//shoesId 붙여야되는 이유?
router.get("/shoes/:shoesId", async (req, res) => {
  const shoesId = req.params.shoesId;
  const product = await Shoes.findOne({ shoesId });
  if (!product) {
    return res.status(404).json({ message: "The product doesn't exist" });
  } else return res.status(200).json({ data: product });
});

//Update
router.put("/shoes/:shoesId", async (req, res) => {
  //파라미터로 넘어온 변경하고 싶은 shoes Id
  const shoesId = req.params.shoesId;
  const { price } = req.body;

  const existsShoes = await Shoes.find({ shoesId });
  if (existsShoes.length) {
    await Shoes.updateOne({ shoesId: shoesId }, { $set: { price: price } });
  } else return res.status(404).json({ message: "The product doesn't exist" });

  res.status(200).json({ message: "상품 수정 완료" });
});

//Delete
router.delete("/shoes/:shoesId", async (req, res) => {
  const { shoesId } = req.params;

  const existsShoes = await Shoes.find({ shoesId });
  if (existsShoes.length > 0) {
    await Shoes.deleteOne({ shoesId });
  } else return res.status(404).json({ message: "The product doesn't exist" });

  res.json({ result: "success" });
});

module.exports = router;
