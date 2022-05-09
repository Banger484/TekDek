const { Post, User, Comment } = require('../../models')

const router = require('express').Router()

router.get('/', async (req, res) => {

    const postData = await Post.findAll({
        where: {
            id: req.session.user_id
        },
        include: [
            {
              model: User,
              attributes: ["id", "username"],
            },
            {
              model: Comment,
              attributes: ["comment", "user_id", "created"],
            },
          ],
        });
    const posts = postData.map((post) => post.get({ plain: true }))

    try {
        
        res.render('dashboard', {
            posts,
        })
    } catch (err) {
        res.json(err)
    }
})


module.exports = router