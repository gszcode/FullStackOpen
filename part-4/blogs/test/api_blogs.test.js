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

describe('when there is initially some notes saved', () => {
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

  test('a specific note is within the returned notes', async () => {
    const blogs = await api.get('/api/blogs')

    const titles = blogs.map((blog) => blog.title)
    expect(titles).toContain('Gaby')
  })
})

describe('viewing a specific note', () => {
  test('succeeds with a valid id', async () => {
    const blogAtStart = await helper.allBlogs()
    const blogToView = blogAtStart[0]

    const resultNote = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedNoteToView = JSON.parse(JSON.stringify(blogToView))
    expect(resultNote.body).toEqual(processedNoteToView)
  })

  test('fails with statusCode 404 if note does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()
    console.log(validNonexistingId)

    await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api.get(`/api/blogs/${invalidId}`).expect(400)
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Gabito',
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

    const titles = blogsDb.map((n) => n.title)
    expect(titles).toContain('Gabito')
  })

  test('fails with status code 400 if data invalid', async () => {
    const newBlog = {
      likes: 8
    }

    await api.post('/api/blogs').send(newBlog).expect(400)

    const blogsDb = await helper.allBlogs()
    expect(blogsDb).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.allBlogs()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.allBlogs()
    expect(blogsAtEnd).toHaveLength(helper.initialNotes.length - 1)

    const titles = blogsAtEnd.map((r) => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
