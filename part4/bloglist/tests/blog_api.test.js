const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

describe('when there is initially some notes saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
  })
  
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
    expect(titles).toContain('React patterns')
  })
  
  test('the unique identifier property of the blog posts is named id', async () => {
    const newBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    expect(response.body.id).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7
    }
  
    const postedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(postedBlog.body.title).toBe('React patterns')
  })
  
  test('creates and sets likes property to 0 if likes property is missing', async () => {
    const newBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/'
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    expect(response.body.likes).toBe(0)
  })
  
  test('fails with statuscode 400 if title property is missing', async () => {
    const newBlog = {
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })
  
  test('fails with statuscode 400 if url property is missing', async () => {
    const newBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })
})

describe('deletion of a new blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToDelete = blogsAtStart.body[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length - 1)

    const titles = blogsAtEnd.body.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToDelete = {...blogsAtStart.body[0], id: 1234}
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(400)
  
    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length)

    const titles = blogsAtEnd.body.map(r => r.title)
    expect(titles).toContain(blogToDelete.title)
  })
})

describe('update of an existing blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToUpdate = blogsAtStart.body[0]
    const replaceWith = {
      title: 'Updated blog',
      author: 'Someone else',
      url:'http://www.helloworld.edu/',
      likes: 4
    }
  
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(replaceWith)
      .expect(200)
  
    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length)

    const titles = blogsAtEnd.body.map(r => r.title)
    expect(titles).not.toContain(blogToUpdate.title)
    expect(titles).toContain(replaceWith.title)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToUpdate = {...blogsAtStart.body[0], id: 1234}
    const replaceWith = {
      title: 'Updated blog',
      author: 'Someone else',
      url:'http://www.helloworld.edu/',
      likes: 4
    }
  
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(replaceWith)
      .expect(400)
  
    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length)

    const titles = blogsAtEnd.body.map(r => r.title)
    expect(titles).toContain(blogToUpdate.title)
    expect(titles).not.toContain(replaceWith.title)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})