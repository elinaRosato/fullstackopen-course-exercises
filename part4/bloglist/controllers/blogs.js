const blogsRouter = require('express').Router()
const { info, error } = require('../utils/logger')
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
	Blog
		.find({})
		.then(blogs => {
			response.json(blogs)
		})
})
  
blogsRouter.post('/', (request, response) => {
	const blog = new Blog(request.body)

	blog
		.save()
		.then(result => {
			info('note saved!')
			response.status(201).json(result)
		})
})

module.exports = blogsRouter
