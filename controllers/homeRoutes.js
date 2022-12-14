const router = require('express').Router();
const { User } = require('../models');
const { Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: { exclude: ['password'] },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
      // order: [['username', 'ASC']],
    });

    const posts = postData.map((posts) => posts.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
