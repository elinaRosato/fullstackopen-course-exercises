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

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.put('/:id', async (request, response) => {
  const blogToUpdate = await Blog.findById(request.params.id)

  const body = request.body

  const newBlog = { 
    title: body.title || blogToUpdate.title,
    author: body.author || blogToUpdate.author,
    url: body.url || blogToUpdate.url,
    likes: body.likes || blogToUpdate.likes || 0,
  }
  console.log(newBlog)

  const updatedBlogs = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true, runValidators: true, context: 'query' })
  response.json(updatedBlogs)
})

module.exports = blogsRouter
