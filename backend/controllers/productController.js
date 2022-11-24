import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import { saveSingleFile, saveMultipleFile } from "../utils/saveFile.js";
import { getUrlImageArr, getUrlImageForArrObject } from "../utils/getUrlImage.js";

// sort products by category and price
export const selectProductsByCategoryAndSort = async (req, res, next) => {
  try {
    const products = await Product.find(
      { category: req.params.id },
      [],
      { sort: { price: req.params.code } }
    );
    const result = getUrlImageForArrObject(products);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

// sort all products by price
export const selectAllProductsAndSort = async (req, res, next) => {
  try {
    const products = await Product.find({}, [], { sort: { price: req.params.code } });
    const result = getUrlImageForArrObject(products);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

// update product by id
export const updateProduct = async (req, res, next) => {
  try {
    const img = req.body.img;
    const body = { ...req.body, img: img };
    const update = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { $set: body },
      { new: true }
    )
    res.status(200).json(update)
  } catch (error) {
    next(error)
  }
}
// delete product by id
export const deleteProduct = async (req, res, next) => {
  try {
    const result = await Product.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json("Product has been deleted");
  } catch (err) {
    next(err);
  }
};

// select a product
export const selectProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne(
      {
        _id: req.params.id
      }
    );
    const result = { ...product._doc, imgPath: product.coverImagePath };
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

// select product by category
export const selectProductsByCategory = async (req, res, next) => {
  try {
    const products = await Product.find(
      {
        category: req.params.id
      }
    );
    const result = getUrlImageForArrObject(products);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

// select all products
export const selectAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    const result = getUrlImageForArrObject(products);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

// create a new product
export const createProduct = async (req, res, next) => {
  try {
    const image = req.body.img;
    const body = { ...req.body }
    const product = new Product(body);

    if (typeof req.body.img === 'string') {
      saveSingleFile(product, image)
    }
    else
      saveMultipleFile(product, image)

    await product.save();
    res.status(200).send("Product has been created.");
  } catch (err) {
    next(err);
  }
}


