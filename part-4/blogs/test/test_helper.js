const Blog = require('../models/note')

const initialBlogs = [
  {
    title: 'Gaby',
    author: 'Sanchez',
    url: 'https://fullstackopen.com/es/part4/',
    likes: 3
  },
  {
    title: 'Juancito',
    author: 'Perez',
    url: 'https://fullstackopen.com',
    likes: 1
  }
]

const allBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  allBlogs
}
