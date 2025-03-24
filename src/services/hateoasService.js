export const generateHateoasLinks = (req, resource, id) => {
  const baseUrl = `${req.protocol}://${req.get('host')}/api/${resource}`;

  return {
    self: {
      href: `${baseUrl}/${id}`,
    },
    edit: {
      href: `${baseUrl}/${id}`,
      method: 'PUT',
    },
    delete: {
      href: `${baseUrl}/${id}`,
      method: 'DELETE',
    },
  };
};

export const generateHateoasCollection = (req, resource, items) => {
  const baseUrl = `${req.protocol}://${req.get('host')}/api/${resource}`;

  return {
    count: items.length,
    _links: {
      self: {
        href: baseUrl,
        method: 'GET',
      },
      create: {
        href: baseUrl,
        method: 'POST',
      },
    },
    items: items.map(item => ({
      ...item.toObject(),
      _links: generateHateoasLinks(req, resource, item._id),
    })),
  };
};
