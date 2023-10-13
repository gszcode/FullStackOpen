const Blog = require('../models/note')

const getAllBlogs = (req, res, next) => {
  Blog.find({})
    .then((blog) => {
      return res.status(200).json(blog)
    })
    .catch((err) => next(err))
}

const getBlog = (req, res, next) => {
  const { id } = req.params

  Blog.findById(id)
    .then((blog) => {
      if (blog) return res.status(200).json(blog)
      else return res.status(404).json({ error: 'blog does not exist' })
    })
    .catch((err) => next(err))
}

const createBlog = (req, res, next) => {
  const { title, author, url, likes } = req.body

  if (!title || !author) return res.status(400).json({ error: 'Data missing' })

  const blog = new Blog({ title, author, url, likes })
  blog
    .save()
    .then((blog) => {
      return res.status(201).json(blog)
    })
    .catch((err) => next(err))
}

const deleteBlog = (req, res, next) => {
  const { id } = req.params

  Blog.findByIdAndRemove(id)
    .then((blog) => {
      if (blog) return res.status(200).json({ message: 'Deleted blog' })
      else return res.status(400).json({ message: 'blog does not exist' })
    })
    .catch((err) => next(err))
}

module.exports = {
  getAllBlogs,
  getBlog,
  createBlog,
  deleteBlog
}
