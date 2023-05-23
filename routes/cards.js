const cardRoutes = require('express')
  .Router();

const {
  getCards,
  deleteCard,
  createCard,
  addLike,
  deleteLike,
} = require('../controllers/cards');

const {
  createCardValidation,
  validationCardById,
} = require('../middlewares/validation');

cardRoutes.get('/', getCards);
cardRoutes.post('/', createCardValidation, createCard);
cardRoutes.delete('/:cardId', validationCardById, deleteCard);
cardRoutes.put('/:cardId/likes', validationCardById, addLike);
cardRoutes.delete('/:cardId/likes', validationCardById, deleteLike);

module.exports = cardRoutes;
