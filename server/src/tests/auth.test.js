import request from 'supertest';
import app from '../index'; // Assuming your Express app is exported from index.js
import User from '../models/User';

describe('Authentication Tests', () => {
  beforeAll(async () => {
    await User.deleteMany({}); // Clear the database before tests
  });

  afterAll(async () => {
    await User.deleteMany({}); // Clean up after tests
  });

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('should login an existing user', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      });

    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should fail to login with wrong credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'wronguser@example.com',
        password: 'wrongpassword',
      });
    
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });
});