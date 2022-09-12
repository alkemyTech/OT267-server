const { findComentById } = require('../services/comment');

const validateUserCommentCreatorOrAdmin = (req, res, next) => {
  const { id } = req.params;
  const comment = findComentById(id);

  return (req.userId !== comment.userId && req.roleId !== 1)
    ? res.status(403).send('unauthorized function for this userd')
    : next();
};

module.exports = { validateUserCommentCreatorOrAdmin };
