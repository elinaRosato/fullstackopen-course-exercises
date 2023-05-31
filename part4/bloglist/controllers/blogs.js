const blogsRouter = require('express').Router()
const { info } = require('../utils/logger')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  const blogData = { likes: 0, ...request.body }
  const blog = new Blog(blogData)
  const savedBlog = await blog.save()
  info('note saved!')
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter
