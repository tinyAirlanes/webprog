const router = require('express').Router();
const userController = require('../controllers/userController');

/**
* get user by id
* @route GET /api/users/{id}
* @group Users - user operations

* @returns {Error} 404 - User not found
* @returns {Error} 400 - Bad request
*/
router.get('/:id', userController.getUserById);

/**
 * get users
 * @route GET /api/users
 * @group Users - user operations
 
 
 * @returns {Error} 404 - Users not found
 * @returns {Error} 400 - Bad request
 */
router.get('/', userController.getUsers);


module.exports = router;