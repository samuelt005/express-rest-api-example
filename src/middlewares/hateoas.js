import httpStatus from "http-status";

export default (req, res, next) => {
  res.hateoas_item = (data) => {
    res.okResponse({
      ...data._doc,
      _links: generateHateoasLinks(req, data._id),
    });
  }

  res.hateoas_list = (data) => {
    res.okResponse(generateHateoasCollection(req, data));
  }

  next();
}

const generateHateoasLinks = (req, id) => {
  return [
    {
      rel: "self",
      href: `${req.baseUrl}/${id}`,
      method: 'GET',
    },
    {
      rel: "list",
      href: req.baseUrl,
      method: 'GET',
    },
    {
      rel: "update",
      href: `${req.baseUrl}/${id}`,
      method: 'PUT',
    },
    {
      rel: "delete",
      href: `${req.baseUrl}/${id}`,
      method: 'DELETE',
    },
  ];
};

const generateHateoasCollection = (req, items) => {
  return {
    count: items.length,
    _links: [
      {
        rel: "self",
        href: req.baseUrl,
        method: 'GET',
      },
      {
        rel: "create",
        href: req.baseUrl,
        method: 'POST',
      },
    ],
    data: items.map(item => ({
      ...item.toObject(),
      _links: generateHateoasLinks(req, item._id),
    })),
  };
};
