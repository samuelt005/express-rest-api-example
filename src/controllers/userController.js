import User from '../models/userModel.js'
import httpStatus from 'http-status'

export const showUser = async (req, res, next) => {
  try {
    const user = await User.findOne(req.params)

    res
      .status(httpStatus.OK)
      .json(user)
  } catch (err) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({
        message: err.message
      })
  }
}

export const listUsers = async (req, res, next) => {
  try {
    const users = await User.find()

    res
      .status(httpStatus.OK)
      .json(users)
  } catch (err) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({
        message: err.message
      })
  }
}

export const createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)

    res
      .status(httpStatus.CREATED)
      .json(newUser)
  } catch (err) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({
        message: err.message
      })
  }
}

export const editUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params, req.body, { new: true })

    res
      .status(httpStatus.OK)
      .json(updatedUser)
  } catch (err) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({
        message: err.message
      })
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    await User.deleteOne(req.params)

    res
      .status(httpStatus.OK)
      .send()
  } catch (err) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({
        message: err.message
      })
  }
}
