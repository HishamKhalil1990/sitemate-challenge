const request = require('supertest');
const app = require('../app')
const mongodb = require('../utils/mongodb');

// Mock the mongodb functions
jest.mock('../utils/mongodb');

describe('Issues Controller Tests', () => {
  // Test for createIssue
  describe('POST /issues', () => {
    it('should create a new issue and return it', async () => {
      const mockIssue = { title: 'New Issue', description: 'New Issue description with charachters more than 20 at least' };
      
      mongodb.createNew.mockResolvedValue(mockIssue);

      const response = await request(app)
        .post('/issues')
        .send(mockIssue);

      expect(response.status).toBe(200);
      expect(response.body.result).toEqual(mockIssue);
    });

    it('should return 400 if validation fails', async () => {
      const response = await request(app)
        .post('/issues')
        .send({ title: '' }); // Missing description

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  // Test for updateIssue
  describe('PUT /issues/:id', () => {
    it('should update an issue and return the updated issue', async () => {
      const mockIssue = { title: 'New Issue', description: 'Updated the old description with charachters more than 20 at least' };

      mongodb.updateByID.mockResolvedValue(mockIssue);

      const response = await request(app)
        .put('/issues/66daaa2accdfeeca2dbfbc47')
        .send(mockIssue);

      expect(response.status).toBe(200);
      expect(response.body.result).toEqual(mockIssue);
    });

    it('should return 400 if validation fails', async () => {
      const response = await request(app)
        .put('/issues/66daaa2accdfeeca2dbfbc47')
        .send({ title: '' }); // Invalid title

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  // Test for deleteIssue
  describe('DELETE /issues/:id', () => {
    it('should delete an issue and return 200', async () => {
      mongodb.deleteByID.mockResolvedValue(true);

      const response = await request(app)
        .delete('/issues/66daaa2accdfeeca2dbfbc47');

      expect(response.status).toBe(200);
    });

    it('should return 400 if validation fails', async () => {
      const response = await request(app)
        .delete('/issues/invalid-id'); // Invalid ID

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  // Test for findIssues
  describe('GET /issues', () => {
    it('should return all issues when no id is provided', async () => {
      const mockIssues = [
        { title: 'Issue 1', description: 'Description 1 with charachters more than 20 at least' },
        { title: 'Issue 2', description: 'Description 2 with charachters more than 20 at least' }
      ];

      mongodb.findAll.mockResolvedValue(mockIssues);

      const response = await request(app)
        .get('/issues');

      expect(response.status).toBe(200);
      expect(response.body.result).toEqual(mockIssues);
    });

    it('should return an issue when id is provided', async () => {
      const mockIssue = { title: 'Issue 1', description: 'Description 1 with charachters more than 20 at least' };

      mongodb.findAll.mockResolvedValue(mockIssue);

      const response = await request(app)
        .get('/issues?id=66daaa2accdfeeca2dbfbc47');

      expect(response.status).toBe(200);
      expect(response.body.result).toEqual(mockIssue);
    });

    it('should return 400 if validation fails', async () => {
      const response = await request(app)
        .get('/issues?id=invalid-id'); // Invalid ID

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });
});
