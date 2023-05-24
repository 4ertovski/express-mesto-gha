const router = require('express')
  .Router();

const cardsRouter = require('./cards');
const usersRouter = require('./users');
const NotFoundError = require('../errors/NotFoundError');
const { loginValidation, createUserValidation } = require('../middlewares/validation');
const { login, createUser } = require('../controllers/auth');
const auth = require('../middlewares/auth');

router.post('/signin', loginValidation, login);
router.post('/signup', createUserValidation, createUser);
router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use((request, response, next) => {
  next(new NotFoundError('Такая страница не существует'));
});

module.exports = router;
