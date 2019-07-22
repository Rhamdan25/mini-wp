const express = require("express")
const router = express.Router()
const ArticleController = require("../controllers/articleController")
const {authenticate, authorization} = require("../middlewares/auth")

router.get('/', ArticleController.findAll)
router.post('/create', ArticleController.create)
router.put('/fav/:id',ArticleController.favourited )
router.get('/:id', ArticleController.searchById)
router.put('/:id', ArticleController.update)
router.delete('/:id', ArticleController.delete)



module.exports = router