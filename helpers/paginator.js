const paginator = async (req, model, urlmodel, moreOptions, by, order) => {
  // endpoint
  const url = `http://localhost:3000/${urlmodel}?page=`;

  // pages
  const getNextPage = (page, limit, total) => {
    if ((total / limit) > page) {
      return url + (page + 1);
    }
    return null;
  };

  const getPreviousPage = (page, limit, total) => {
    const maxPages = Math.ceil(total / limit);

    if (maxPages < page) return url + maxPages;
    if (page <= 1) return null;
    return url + (page - 1);
  };

  // getOffset
  const getOffset = (page, limit) => (page * limit) - limit;

  // current page
  let page = 1;
  if (!Number.isNaN(Number(req.query.page))) { page = Number(req.query.page); }

  // rows per pagina
  const limit = 10;

  // request
  const options = {
    offset: getOffset(page, limit),
    limit,
    order: [[by || 'createdAt', order || 'DESC']],
    ...moreOptions,
  };

  const { count, rows } = await model.findAndCountAll(options);

  // total pages
  const totalPages = Math.ceil(count / limit);

  return {
    totalPages,
    previousPage: getPreviousPage(page, limit, count),
    currentPage: page > totalPages ? 'page does not exist' : page,
    nextPage: getNextPage(page, limit, count),
    totalRows: count,
    rowsPerPage: limit,
    rows,
  };
};

module.exports = {
  paginator,
};
