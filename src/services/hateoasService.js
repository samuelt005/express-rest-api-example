export const generateHateoasLinks = (req, id) => {
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

export const generateHateoasCollection = (req, items) => {
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
    items: items.map(item => ({
      ...item.toObject(),
      _links: generateHateoasLinks(req, item._id),
    })),
  };
};
