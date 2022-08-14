const router = require('express').Router();
const { User } = require('../../models');
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

let singlePost = [];
let id = '';
let postCommentsSplit = [];

router.get('/:id', withAuth, async (req, res) => {

  try {
    const postData = await Post.findByPk(req.params.id, {
      include: { attributes: { exclude: ['password'] }, all: true },
    })
    const post = postData.get({ plain: true });
    // singlePost.push(post);
    // id = req.params.id;

    
    const postComments = postData.comments.map((project) => project.get({ plain: true }));
    // postCommentsSplit.push(postComments);
    console.log(post);
    // res.status(200).json(postData);
    res.render('singlepost', {
      post, postComments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;