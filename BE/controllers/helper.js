export const paginate = (page = 1, limit = 10) => {
  const currentPage = Number(page);
  const pageSize = Number(limit);

  return {
    limit: pageSize,
    offset: (currentPage - 1) * pageSize,
  };
};