const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  savePark,
  deletePark,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, savePark);

router.route('/login').post(login);

router.route('/parks/:parkId').delete(authMiddleware, deletePark);

module.exports = router;