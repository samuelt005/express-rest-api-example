import User from '../models/userModel.js';
import httpStatus from 'http-status';

export const showUser = async (req, res, next) => {
  try {
    const user = await User.findOne(req.params);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({message: 'Usuário não encontrado'});
    }

    res.hateoas_item(user);
  } catch (err) {
    next(err);
  }
};

export const listUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.hateoas_list(users);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    await User.create(req.body);

    res.status(httpStatus.CREATED).json();
  } catch (err) {
    next(err);
  }
};

export const editUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params._id);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).
        json({message: 'Usuário não encontrado'});
    }

    const updatedUser = await User.findByIdAndUpdate(req.params, req.body, {new: true});

    res.hateoas_item(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params._id);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({message: 'Usuário não encontrado'});
    }

    await User.deleteOne(req.params);

    res.status(httpStatus.OK).send();
  } catch (err) {
    next(err);
  }
};
