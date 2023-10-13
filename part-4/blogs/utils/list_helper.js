const dummy = (array) => {
  return 1
}

const totalLikes = (posts) => {
  let totalSum = 0
  posts.map((post) => (totalSum += post.likes))

  return posts.length < 1 ? 0 : totalSum
}

const favoriteBlog = (blogs) => {
  if (blogs < 1) return {}

  let mayor = blogs[0]
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > mayor.likes) mayor = blogs[i]
  }

  return mayor
}

const mostBlogs = (array) => {
  let countBlogs = array[0]

  for (let i = 0; i < array.length; i++) {
    if (array[i].blogs > countBlogs.blogs) countBlogs = array[i]
  }

  return array.length < 1 ? {} : countBlogs
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
