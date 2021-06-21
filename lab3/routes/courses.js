const courseRouter = require('express').Router();
const courseController = require('../controllers/courseController.js');

 courseRouter
    .get('/new', (req, res) => {
        res.status(200).render('newCourse', {
            headTitle: 'Create new Course', coursesCurrent: 'current'
        });
    })  
    
    
    /**
    * @route GET /api/courses/{id}
    * @group Courses - entity operations
    * @param {integer} id.path.required - id of the Course - eg: 1
    * @returns {Course.model} 200 - Course object
    * @returns {Error} 400 - Bad request
    * @returns {Error} 404 - Course was not found
    */
    .get('/:id',courseController.getCourseById)
    /**
    * @route PUT /api/courses
    * @group Courses - entity operations
    * @param {Course.model} id.body.required - Course object to update
    * @returns {Course.model} 200 - updated Course object
    * @returns {Error} 400 - Bad request
    * @returns {Error} 404 - Course were not found
    */
    .post('/:id', courseController.deleteCourseById)
     /**
    * @route GET /api/courses
    * @group Courses - entity operations
    * @param {integer} page.query - page number
    * @param {integer} per_page.query - items per page
    * @returns {Array.<Course>} Courses - all courses
    * @returns {Error} 404 - Courses were not found
    * @returns {Error} 400 - Bad request
    */
    .get('/', courseController.getCourses)
    /**
    * @route POST /api/courses
    * @group Courses - entity operations
    * @param {Course.model} id.body.required - new Course object
    * @returns {Course.model} 201 - added Course object
    * @returns {Error} 400 - Bad request
    */
    .post('/', courseController.addCourse)
    /**
    * @route DELETE /api/courses/{id}
    * @group Courses - entity operations
    * @param {integer} id.path.required - id of the Course - eg: 1
    * @returns {Course.model} 200 - deleted Course object
    * @returns {Error} 400 - Bad request
    * @returns {Error} 404 - Course were not found
    */
    .put('/',courseController.updateCourse);

module.exports = courseRouter;