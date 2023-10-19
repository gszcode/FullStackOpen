const mongoose = require('mongoose')
const Blog = require('../models/note')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany()

  const newBlogs = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = newBlogs.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('all blogs are returned', async () => {
  const blogs = await api.get('/api/blogs')

  expect(blogs.body).toHaveLength(helper.initialBlogs.length)
})
test('one blog can be added', async () => {
  const newBlog = {
    title: 'Gaby',
    author: 'Sanchez',
    url: 'https://fullstackopen.com/es/part4/',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsDb = await helper.allBlogs()
  expect(blogsDb).toHaveLength(helper.initialBlogs.length + 1)
})
test('blog without likes is invalid', async () => {
  const newBlog = {
    likes: 8
  }

  await api.post('/api/blogs').send(newBlog).expect(400)

  const blogsDb = await helper.allBlogs()
  expect(blogsDb).toHaveLength(helper.initialBlogs.length)
})
test('blog without title or url is invalid', async () => {
  const newBlog = {
    title: 'Gaby',
    author: 'Sanchez',
    url: 'https://fullstackopen.com/es/part4/'
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
  const blogsDb = await helper.allBlogs()
  expect(blogsDb).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
