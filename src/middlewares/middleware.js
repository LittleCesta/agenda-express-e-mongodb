exports.middlewareGlobal = (req, res, next) => {
  // Injetando pelo middleware eu consigo inserir em mais
  // de uma rota a mesma variável, sem precisar repetir o código
  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if (err) {
    return res.render("404");
  }
  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
