export function validate(schema, source = 'body') {
  return (req, _res, next) => {
    const data = source === 'query' ? req.query : source === 'params' ? req.params : req.body;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      parsed.error.status = 400;
      return next(parsed.error);
    }
    if (source === 'query') req.query = parsed.data;
    else if (source === 'params') req.params = parsed.data;
    else req.body = parsed.data;
    next();
  };
}





