export function successResponse(data, message = 'Success', statusCode = 200) {
  return {
    success: true,
    message,
    data,
    statusCode
  };
}

export function errorResponse(message = 'Error', statusCode = 500, errors = null) {
  return {
    success: false,
    message,
    errors,
    statusCode
  };
}

export function paginatedResponse(data, page, limit, total) {
  return {
    success: true,
    data,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };
}
