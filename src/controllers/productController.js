import Product from '../models/productModel.js';

export const showProduct = async (req, res, next) => {
  try {
    const {_id} = req.params;

    const product = await Product.findOne({_id});

    if (!product) {
      return res.notFoundResponse();
    }

    res.hateoas_item(product);
  } catch (err) {
    next(err);
  }
};

export const listProducts = async (req, res, next) => {
  try {
    const {_page, _size, _order, ...filter} = req.query;
    const page = parseInt(_page) || 1;
    const size = parseInt(_size) || 10;
    const offset = (page - 1) * size;

    const products = await Product
      .find(filter)
      .skip(offset)
      .limit(size)
      .sort(_order)

    const totalItems = await Product.countDocuments();
    const totalPages = Math.ceil(totalItems / size);

    res.hateoas_list(products, totalPages);
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const {name, description, price} = req.body;

    await Product.create({
      name,
      description,
      price
    });

    res.createdResponse();
  } catch (err) {
    next(err);
  }
};

export const editProduct = async (req, res, next) => {
  try {
    const {name, description, price} = req.body;

    const {_id} = req.params;

    const product = await Product.findById(_id);

    if (!product) {
      return res.notFoundResponse();
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      {_id},
      {name, description, price},
      {new: true}
    );

    res.hateoas_item(updatedProduct);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const {_id} = req.params;

    const product = await Product.findById(_id);

    if (!product) {
      return res.notFoundResponse();
    }

    await Product.deleteOne({_id});

    res.noContentResponse();
  } catch (err) {
    next(err);
  }
};
