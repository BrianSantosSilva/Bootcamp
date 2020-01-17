import request from 'supertest';
import app from '../../src/app';

describe('User', () => {
  it('shold be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Diego Fernades',
        email: 'diego@rocktseat.com.br',
        password_hash: '123456',
      });

    expect(response.body).toHaveProperty('id');
  });
});
