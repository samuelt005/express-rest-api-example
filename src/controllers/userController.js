import User from '../models/userModel.js';

export const showUser = async (req, res, next) => {
  try {
    const {_id} = req.params;

    const user = await User.findOne({_id});

    if (!user) {
      return res.notFoundResponse();
    }

    res.hateoas_item(user);
  } catch (err) {
    next(err);
  }
};

export const listUsers = async (req, res, next) => {
  try {
    const {_page, _size, _order, ...filter} = req.query;
    const page = parseInt(_page) || 1;
    const size = parseInt(_size) || 10;
    const offset = (page - 1) * size;

    const users = await User
      .find(filter)
      .skip(offset)
      .limit(size)
      .sort(_order)

    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / size);

    res.hateoas_list(users, totalPages);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const {name, email, password} = req.body;

    console.log(name, email, password)

    await User.create({
      name,
      email,
      password
    });

    res.createdResponse();
  } catch (err) {
    next(err);
  }
};

export const editUser = async (req, res, next) => {
  try {
    const {name, email, password} = req.body;

    const {_id} = req.params;

    const user = await User.findById(_id);

    if (!user) {
      return res.notFoundResponse();
    }

    const updatedUser = await User.findByIdAndUpdate(
      {_id},
      {name, email, password},
      {new: true}
    );

    res.hateoas_item(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const {_id} = req.params;

    const user = await User.findById(_id);

    if (!user) {
      return res.notFoundResponse();
    }

    await User.deleteOne({_id});

    res.noContentResponse();
  } catch (err) {
    next(err);
  }
};
