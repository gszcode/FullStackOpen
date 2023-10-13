const express = require('express')
const blog = require('../controllers/notes')
const route = express.Router()

route.get('/', blog.getAllBlogs)
route.get('/:id', blog.getBlog)
route.post('/', blog.createBlog)
route.delete('/:id', blog.deleteBlog)

module.exports = route
