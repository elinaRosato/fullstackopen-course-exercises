const blogsRouter = require('express').Router()
const { info } = require('../utils/logger')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const blog = new Blog({ 
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })
  const savedBlog = await blog.save()
  info('note saved!')
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = { 
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
  response.json(updatedBlog)
})

module.exports = blogsRouter
