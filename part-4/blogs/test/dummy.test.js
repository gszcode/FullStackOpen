const listHelper = require('../utils/list_helper')

xtest('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

xdescribe('total likes', () => {
  test('of empty list is zero', () => {
    const posts = []

    const result = listHelper.totalLikes(posts)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(5)
  })

  test('of a bigger list is a calculate right', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        likes: 12,
        __v: 0
      }
    ]

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(17)
  })
})

xdescribe('favorite blogs is', () => {
  test('of empty list is zero', () => {
    const blogs = []

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({})
  })

  test('when list has only one blog equals the likes of that', () => {
    const blogs = [
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12
      }
    ]

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[0])
  })

  test('of a bigger list is a calculate right', () => {
    const blogs = [
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12
      },
      {
        title: 'Canonical reduction',
        author: 'Go To Statement Considered Harmful',
        likes: 2
      },
      {
        title: 'string reduction',
        author: 'Robert C. Martin',
        likes: 34
      }
    ]

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })
})

describe('author with most blogs', () => {
  test('of empty list is zero', () => {
    const blogs = []

    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({})
  })

  test('when list has only one blog equals the likes of that', () => {
    const blogs = [
      {
        author: 'Robert C. Martin',
        blogs: 3
      }
    ]

    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(blogs[0])
  })

  test('of a bigger list is a calculate right', () => {
    const blogs = [
      {
        author: 'Robert C. Martin',
        blogs: 3
      },
      {
        author: 'Gabito',
        blogs: 8
      },
      {
        author: 'Juancito',
        blogs: 1
      }
    ]

    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(blogs[1])
  })
})
