const Article = require("../models/article")
const { decoded } = require('../helpers/jwt')

class ArticleController{
    static findAll(req, res, next) {
        Article.find({
        })
        .sort([['createdAt', 'descending']])
        .populate('author')
        .populate('favouritedBy')
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static searchById(req, res, next) {
        Article.findById(req.params.id)
        .then(data => {
            if (!data) res.status(404).json({ message: 'Not Found' })
                else res.status(200).json(data)
        }) 
        .catch(next)
    }

    static create(req, res, next) {
        // let token = decoded(req.headers.token)
        let obj = {
            title: req.body.title,
            content: req.body.content,
            author: req.body.author
        }
        Article.create(obj)
        .then(data => {
            res.status(200).json(data)           
        })
        .catch(next)
    }

    static update(req, res, next) {
        let obj = {
            title: req.body.title,
            content: req.body.content
        }
        Article.findOne({_id : req.params.id})
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'Not Found' })
            } else {
                data.set(obj)
                return data.save()
            }
        }) 
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static favourited(req,res,next){
        Article.update({ _id : req.params.id},
            {
            $push: {"favouritedBy": {
                userId : req.body.userId 
                }  
            },
        })
        .then(data=>{
            console.log("favourited")
            res.status(200).json(data)
        })
        .catch(next)
    }

    static delete(req, res, next) {
        Article.findByIdAndDelete(req.params.id)
        .then(data => {
            if (!data) res.status(404).json({ message: 'Not Found' })
                else res.status(200).json(req.params.id)
        }) 
        .catch(next)
    }
}

module.exports = ArticleController