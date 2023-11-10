const express = require("express");
const Shoes = require("../schemas/products.schema.js");
const router = express.Router();

//Create
router.post("/products", async (req, res) => {
  try {
    const { shoesId, name, brand, password, price } = req.body;

    if (!shoesId || !name || !brand || !password || !price) {
      return res.status(400).json({ errormessage: "데이터 형식이 올바르지 않습니다." });
    }

    //DB접근
    const newShoes = new Shoes({
      shoesId,
      name,
      brand,
      password,
      price
    });

    await newShoes.save();
    //await Shoes.create({ shoesId, name, brand, price });
    res.status(201).json({ message: "판매상품을 등록하였습니다." });
  } catch (error) {
    res.status(500).json({ errormessage: "예기치 못한 문제가 발생했습니다." });
    console.log(error);
  }
});

//Read
//전체 상품 조회
router.get("/products", async (req, res) => {
  try {
    const shoes = await Shoes.find({}).select("_id shoesId name brand price status createdAt").sort({ createdAt: -1 });
    res.json(shoes);
  } catch (error) {
    res.status(500).json({ errormessage: "예기치 못한 문제가 발생했습니다." });
    console.log(error);
  }
});

//상품 상세 정보
router.get("/product/:shoesId", async (req, res) => {
  try {
    const shoesId = req.params.shoesId;
    const product = await Shoes.find({ shoesId }).select("_id shoesId name brand price status createdAt");
    if (!product) {
      return res.status(404).json({ message: "상품 조회에 실패하였습니다." });
    }
    return res.status(200).json({ data: product });
  } catch (error) {
    res.status(500).json({ errormessage: "예기치 못한 문제가 발생했습니다." });
    console.log(error);
  }
});

//Update
router.put("/product/:productId", async (req, res) => {
  try {
    if (!req.body || !req.params) {
      res.status(400).json({ errormessage: "데이터 형식이 올바르지 않습니다." });
    }
    const product = await Shoes.findById(req.params.productId);
    // const shoesId = req.params.shoesId;
    // const product = await Shoes.find({ shoesId }).select("_id shoesId name brand password price status createdAt");
    const { name, brand, password, price, status } = req.body;

    if (!product) {
      return res.status(404).json({ message: "상품 조회에 실패하였습니다." });
    }

    if (password != product.password) {
      return res.status(401).json({ errormessage: "상품을 수정할 권한이 존재하지 않습니다." });
    }

    product.name = name;
    product.brand = brand;
    product.price = price;
    product.status = status;

    await product.save();
    res.status(200).json({ message: "상품 수정 완료" });
  } catch (error) {
    res.status(500).json({ errormessage: "예기치 못한 문제가 발생했습니다." });
    console.log(error);
  }
});

//Delete
router.delete("/products/:productId", async (req, res) => {
  try {
    if (!req.body || !req.params) {
      res.status(400).json({ errormessage: "데이터 형식이 올바르지 않습니다." });
    }

    const productId = req.params.productId;
    const { password } = req.body;
    const product = await Shoes.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: "상품 조회에 실패하였습니다." });
    }

    if (password !== product.password) {
      return res.status(401).json({ errormessage: "삭제 권한이 없습니다." });
    }

    await product.deleteOne({ id: productId });
    res.json({ result: "성공적으로 삭제 되었습니다." });
  } catch (error) {
    res.status(500).json({ errormessage: "예기치 못한 문제가 발생했습니다." });
    console.log(error);
  }
});

module.exports = router;
