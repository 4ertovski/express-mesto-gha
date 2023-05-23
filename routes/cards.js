const cardRoutes = require('express').Router();

const {
  getCards,
  createCards,
  deleteCard,
  getLikes,
  deleteLikes,
} = require('../controllers/cards');

const {
  validationCreateCard,
  validationCardById,
} = require('../middlewares/validation');

cardRoutes.get('/cards', getCards);
cardRoutes.post('/cards', validationCreateCard, createCards);
cardRoutes.delete('/cards/:cardId', validationCardById, deleteCard);
cardRoutes.put('/cards/:cardId/likes', validationCardById, getLikes);
cardRoutes.delete('/cards/:cardId/likes', validationCardById, deleteLikes);
module.exports = cardRoutes;
