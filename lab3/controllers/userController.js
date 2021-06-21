const UserRepository = require('./../repositories/userRepository');
const userRepository = new UserRepository('./data/users.json');

module.exports = {
    getUserById(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id) || id < 1) {
                res.status(404).render('users', {
                    headTitle: 'Users', usersCurrent: 'current',
                    user: null, msg: 'No such id.'
                });
                
            }
            else {
                const user = userRepository.getUserById(id);
                if (user) {
                    res.status(200).render('user', {
                        headTitle: 'User', usersCurrent: 'current',
                        user: user
                    });
                    }
                else {
                    res.status(404).render('users', {
                        headTitle: 'Users', usersCurrent: 'current',
                        user: null, msg: 'No user.'
                    });
                }
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send('Server error!');
        }
    },
    getUsers(req, res) {
        try {
            const strPage = req.query.page;
            const per_page = 4;
            let page;
            if (strPage === undefined) page = 1;
            else page = parseInt(strPage);
            if (page < 1 || isNaN(page)) page = 1;

            const users = userRepository.getAllUsers();
            if (users) {
                const size = users.length;
                const offset = per_page * (page - 1);
                let maxPage = Math.ceil(size / per_page);
                usersPage = users.slice(offset, offset + per_page);
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
                    headTitle: 'Users', usersCurrent: 'current',
                    usersPage: usersPage, leftPage: leftPage,
                    rightPage: rightPage, maxPage: maxPage
                };
                res.status(200).render('users', params);
            }
            else {
                res.status(200).render('users', {
                    headTitle: 'Users', usersPage: null,
                    usersCurrent: 'current'
                });
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).render('users', {
                headTitle: 'Users', usersCurrent: 'current',
                user: null, msg: 'Server error!'
            });
        }
    }
        
};
