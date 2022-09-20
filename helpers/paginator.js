const paginator = async (req, model, moreOptions) => {
  const { page, by, order } = req.query;
  // endpoint
  const url = `${req.protocol}://${req.get('host')}${req.baseUrl}?page=`;

  // pages
  const getNextPage = (currentPage, limit, total) => {
    if ((total / limit) > currentPage) {
      return url + (currentPage + 1);
    }
    return null;
  };

  const getPreviousPage = (currentPage, limit, total) => {
    const maxPages = Math.ceil(total / limit);

    if (maxPages < currentPage) return url + maxPages;
    if (currentPage <= 1) return null;
    return url + (currentPage - 1);
  };

  // getOffset
  const getOffset = (currentPage, limit) => (currentPage * limit) - limit;

  // current page
  let currentPage = 1;
  if (!Number.isNaN(Number(page))) currentPage = Number(page);

  // rows per pagina
  const limit = 10;

  // by
  let attribute = 'id';
  if (Object.keys(model.rawAttributes).includes(by)) attribute = by;

  // order
  let direction = 'ASC';

  const orderNames = ['ASC', 'DESC'];

  if (orderNames.includes(order)) direction = order;

  // findAndCountAll options
  const options = {
    offset: getOffset(currentPage, limit),
    limit,
    order: [[attribute, direction]],
    ...moreOptions,
  };

  const { count, rows } = await model.findAndCountAll(options);

  // total pages
  const totalPages = Math.ceil(count / limit);

  return {
    totalPages,
    previousPage: getPreviousPage(currentPage, limit, count),
    currentPage: currentPage > totalPages ? 'page does not exist' : currentPage,
    nextPage: getNextPage(currentPage, limit, count),
    totalRows: count,
    rowsPerPage: limit,
    rows,
  };
};

module.exports = {
  paginator,
};
