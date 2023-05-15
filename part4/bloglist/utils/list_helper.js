const dummy = () => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes,0)

const favoriteBlog = (blogs) => {
  return blogs
    .map((blog) => ({ title: blog.title, author: blog.author, likes: blog.likes }))
    .reduce((fav, blog) => fav.likes > blog.likes ? fav : blog , 0)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}