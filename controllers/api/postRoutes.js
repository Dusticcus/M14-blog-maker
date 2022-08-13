const router = require('express').Router();
const { User } = require('../../models');
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id,
      {
        attributes: { exclude: ['password'] },
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      })
      console.log(postData);
      const post = postData.get({ plain: true });
    res.render('singlepost', {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;