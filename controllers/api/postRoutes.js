const router = require('express').Router();
const { response } = require('express');
const { User } = require('../../models');
const { Post } = require('../../models');
const { Comment } = require('../../models');
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
    console.log(req.session);
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

router.post('/new', withAuth, async (req, res) => {
  console.log(req.session.user_id);

    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    })
    .then((response) => res.status(200).json(response))
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
});

router.post('/newcomments', withAuth, async (req, res) => {
  console.log(req.session.user_id);

    const postData = await Comment.create({
      name: req.session.name,
      content: req.body.content,
      user_id: req.session.user_id,
      post_id: req.body.post_id
    })
    .then((response) => res.status(200).json(response))
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
});

// DELETE a single POST
router.delete('/', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: { id: req.body.post_id }
    });

    if (!postData) {
      res.status(404).json({ message: 'No Post found with that id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;