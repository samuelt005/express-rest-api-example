import User from '../models/userModel.js';
import httpStatus from 'http-status';
import {
  generateHateoasCollection,
  generateHateoasLinks,
} from '../services/hateoasService.js';

export const showUser = async (req, res, next) => {
  try {
    const user = await User.findOne(req.params);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({message: 'Usuário não encontrado'});
    }

    res.status(httpStatus.OK).json({
      ...user.toObject(),
      _links: generateHateoasLinks(req, user._id),
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: err.message});
  }
};

export const listUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(httpStatus.OK).json(generateHateoasCollection(req, users));
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: err.message});
  }
};

export const createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    res.status(httpStatus.CREATED).json({
      ...newUser.toObject(),
      _links: generateHateoasLinks(req, newUser._id),
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: err.message});
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

    res.status(httpStatus.OK).json({
      ...updatedUser.toObject(),
      _links: generateHateoasLinks(req, updatedUser._id),
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: err.message});
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
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: err.message});
  }
};
