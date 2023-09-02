export const pageToOffset = (page: number = 1, limit: number = 10) => {
  const offset = (page - 1) * limit;
  return {
    limit,
    offset,
  };
};

export const formatDate = (data: string): string =>
  new Date(data).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
