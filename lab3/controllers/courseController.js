const fs = require('fs');
const path = require('path');

const CourseRepository = require('./../repositories/courseRepository')
const courseRepository = new CourseRepository('./data/courses.json');

const MediaRepository = require('./../repositories/mediaRepository');
const mediaRepository = new MediaRepository('./data/media');

module.exports = {
    getCourseById(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id) || id < 1) {
                res.status(400).render('course', {
                    headTitle: 'Courses', coursesCurrent: 'current',
                    course: null, msg: 'No id'
                });
            }
            else {
                const course = courseRepository.getCourseId(id);
                if (course) {
                    res.status(200).render('course', {
                        headTitle: 'Courses', coursesCurrent:
                            'current', course : course
                    });
                }
                else {
                    res.status(404).render('course', {
                        headTitle: 'Courses', couursesCurrent: 'current',
                        course: null, msg: '404! No course.'
                    });
                }
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).render('course', {
                headTitle: 'Courses', coursesCurrent: 'current',
                course: null, msg: 'Server error!'
            });
        }
    },

    getCourses(req, res) {
        try {
            const strPage = req.query.page;
            const per_page = 4;
            let page;
            if (strPage === undefined) page = 1;
            else page = parseInt(strPage);
            if (page < 1 || isNaN(page)) page = 1;

            let courses = courseRepository.getAllCourses();
            const nameSearch = req.query.name;

            if (courses) {
                if (!(nameSearch === undefined)) {
                    courses = courses.filter(item => item.name.includes(nameSearch));
                    nameQuery = '&name=' + nameSearch;
                }

                const size = courses.length;
                const offset = per_page * (page - 1);
                let maxPage = Math.ceil(size / per_page);
                const coursesPage = courses.slice(offset, offset + per_page);
                const leftPage = [];
                const rightPage = [];

                if (page === 1) leftPage.push({ curPage: page });
                else leftPage.push({ curPage: page, page: page - 1 });

                if (maxPage === 0 || size === 0) {
                    maxPage = 1;
                    page = 1;
                }
                else if (page > maxPage) page = maxPage;

                if (offset + per_page < size)
                    rightPage.push({ curPage: page, page: page + 1 });
                else rightPage.push({ curPage: page });

                const params = {
                    headTitle: 'Courses', coursesCurrent: 'current',
                    coursesPage: coursesPage, leftPage: leftPage,
                    rightPage: rightPage, nameQuery: nameSearch,
                    maxPage: maxPage
                };
                res.status(200).render('courses', params);
            }
            else {
                res.status(200).render('courses', {
                    headTitle: 'Courses', coursesPage: null,
                    coursesCurrent: 'current', nameQuery: nameSearch
                });
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).render('course', {
                headTitle: 'Courses', coursesCurrent: 'current',
                course: null, msg: 'Server error!'
            });
        }
    },

    addCourse(req, res) {
        try {
            if (Object.keys(req.files).length !== 0) {
                const fileFormat = req.files['course_img'].mimetype.split('/')[1];
                fs.writeFileSync(path.resolve(__dirname, '../data/media/' + mediaRepository.getNextId() +
                    '.' + fileFormat), req.files['course_img'].data, (err) => {
                        if (err) {
                            console.log("Cannot load image ", err);
                        }
                    })
                req.body.img = '/media/' + mediaRepository.getNextId() + '.' + fileFormat;
            }
            else req.body.img = null;
            const id = courseRepository.addCourse(req.body);
            mediaRepository.incrementId();
            res.status(303).redirect('/courses/' + id);
        }
        catch (e) {
            console.log(e);
            res.status(500).render('course', {
                headTitle: 'Courses', coursesCurrent: 'current',
                course: null, msg: 'Server error!'
            });
        }
    },

    updateCourse(req, res) {
        try {
            const course = courseRepository.updateCourse(req.body);
            if (course) {
                res.status(200).render('course', {
                    headTitle: 'Courses', coursesCurrent:
                        'current', course: course
                });
            }
            else {
                res.status(404).render('course', {
                    headTitle: 'Courses', coursesCurrent: 'current',
                    course: null, msg: '404! No course.'
                });
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).render('course', {
                headTitle: 'Courses', coursesCurrent: 'current',
                course: null, msg: 'Server error!'
            });
        }
    },

    deleteCourseById(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id) || id < 1) {
                res.status(404).render('course', {
                    headTitle: 'Courses', coursesCurrent: 'current',
                    course: null, msg: '404! No such id.'
                });
            }
            else {
                const course = courseRepository.deleteCourse(id);
                if (course) {
                    res.status(303).redirect('/courses');
                }
                else {
                    res.status(404).render('course', {
                        headTitle: 'Course', coursesCurrent: 'current',
                        course: null, msg: '404! No course.'
                    });
                }
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).render('course', {
                headTitle: 'Course', coursesCurrent: 'current',
                course: null, msg: 'Server error!'
            });
        }
    }
};
