const router = require('express').Router();
const { User } = require('../../models');
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');


// GET dashboard
router.get('/', withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
        
        where: {
            user_id: req.session.user_id
        },
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
  
      res.render('dashboard', {
        posts,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  // --------------------------------

  // UPDATE Post Comment
  router.put('/:id', withAuth, async (req, res) => {
    // update a category by its `id` value
    console.log(req.body);
    try {
      const postCommentUpdateData = await Post.update(req.body, {
        where: {
          id: req.body.id,
        },
      });
      res.status(200).json(postCommentUpdateData);
  
    }
    catch (err) {
      res.status(500).json(err);
    }
  
  });
  // -------------------

module.exports = router;