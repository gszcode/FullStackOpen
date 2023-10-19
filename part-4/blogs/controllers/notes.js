const Blog = require('../models/note')

const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({})
  return res.status(200).json(blogs)
}

const getBlog = async (req, res) => {
  const { id } = req.params

  const blog = await Blog.findById(id)
  if (!blog) return res.status(404).json({ error: 'blog does not exist' })

  return res.status(200).json(blog)
}

const createBlog = async (req, res) => {
  const { title, author, url, likes } = req.body

  if (!title || !author || !likes)
    return res.status(400).json({ error: 'Data missing' })

  const blog = new Blog({ title, author, url, likes })
  await blog.save()

  return res.status(201).json(blog)
}

const deleteBlog = async (req, res) => {
  const { id } = req.params

  const blog = await Blog.findByIdAndRemove(id)
  if (!blog) return res.status(400).json({ message: 'blog does not exist' })

  return res.status(200).json({ message: 'Deleted blog' })
}

module.exports = {
  getAllBlogs,
  getBlog,
  createBlog,
  deleteBlog
}
