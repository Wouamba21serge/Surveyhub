// Runs a Zod schema on req.body. On failure answers 400 with a message per field.
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const fields = {};
    for (const issue of result.error.issues) {
      const key = issue.path.join('.') || 'body';
      if (!fields[key]) fields[key] = issue.message;
    }
    return res.status(400).json({ message: 'Validation failed', fields });
  }
  req.body = result.data; // cleaned values (trimmed, lowercased email...)
  next();
};
