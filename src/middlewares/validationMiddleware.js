export function validateBody(schema) {
  return (req, _res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      parsed.error.status = 400;
      return next(parsed.error);
    }
    req.body = parsed.data;
    next();
  };
}
