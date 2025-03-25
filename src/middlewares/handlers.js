import httpStatus from "http-status";

export default (req, res, next) => {
  res.createdResponse = () => {
    res.status(httpStatus.CREATED).send();
  }

  res.okResponse = (data) => {
    res.status(httpStatus.OK).json(data);
  }

  res.noContentResponse = () => {
    res.status(httpStatus.NO_CONTENT).send();
  }

  res.notFoundResponse = () => {
    res.status(httpStatus.NOT_FOUND).json({message: 'Not found'});
  }

  next();
}
