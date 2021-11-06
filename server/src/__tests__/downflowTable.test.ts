import supertest from 'supertest';
import createServer from '@src/utils/server';
import db from '@src/models';
import mocks from '@src/__tests__/mocks';

const app = createServer();

beforeAll(async () => {
  await db.DownflowTable.sync({ force: true });
  await db.DownflowTable.bulkCreate(mocks.longDb);
});

describe('getTable endpoint', () => {
  describe('get request with the good params', () => {
    it('should return a 200 and return the data', async () => {
      const response = await supertest(app).get('/').query(mocks.getQuery.goodQuery);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy;
    });
    it('should retrieve data according to each query params', async () => {
      const response = await supertest(app).get('/').query(mocks.getQuery.goodQuery);
      expect(response.body.length).toBe(mocks.getQuery.goodQuery.count);
      expect(response.body[0].lastName).toBe('Atkin');
    });
  });

  describe('get request with missing params', () => {
    it('should return a 400', async () => {
      const response = await supertest(app).get('/').query(mocks.getQuery.badQuery);
      expect(response.statusCode).toBe(400);
      expect(response.body).toBeFalsy;
    });
  });
});

describe('getCount endpoint', () => {
  describe('getCount request', () => {
    it('should return the total count of entries in database with 200', async () => {
      const response = await supertest(app).get('/totalCount');
      expect(response.statusCode).toBe(200);
      expect(response.body.totalCount).toBe(mocks.longDb.length);
    });
  });
});

describe('postRow endpoint', () => {
  describe('POST /row request with mandatory fields filled', () => {
    it('should return a 201, record the new entry, and send it back', async () => {
      const response = await supertest(app).post('/row').send(mocks.rowInserts.goodRow);

      expect(response.statusCode).toBe(201);
      expect(response.body).toBeTruthy;
      expect(response.body.lastName).toBe('Patchouli');
    });
    it('the entry should be found in the database', async () => {
      const entry = await db.DownflowTable.findAll({
        where: {
          lastName: mocks.rowInserts.goodRow.lastName,
        },
      });
      expect(entry[0].dataValues.lastName).toBe(mocks.rowInserts.goodRow.lastName);
    });
  });

  describe('POST /row request with missing mandatory fields', () => {
    it('should return a 403', async () => {
      const response = await supertest(app).post('/row').send(mocks.rowInserts.badRow);
      expect(response.statusCode).toBe(403);
    });
    it('should not record the entry in the database', async () => {
      const entry = await db.DownflowTable.findAll({
        where: {
          lastName: mocks.rowInserts.badRow.lastName,
        },
      });
      expect(entry.length).toBeFalsy;
    });
  });
});

describe('updateRow endpoint', () => {
  describe('PUT /row request on an existing entry in the database', () => {
    const query = mocks.updateQuery.goodQuery.params;
    const body = mocks.updateQuery.goodQuery.body;
    it('should return a 201', async () => {
      const response = await supertest(app).put('/row').query(query).send(body);
      expect(response.statusCode).toBe(201);
    });
    it('should have updated the value in the database', async () => {
      const entry = await db.DownflowTable.findAll({
        where: {
          id: query.id,
        },
      });
      expect(entry[0].dataValues.lastName).toBe(body.newValue);
    });
  });

  describe('¨PUT /row request on a wrong entry in the database', () => {
    const query = mocks.updateQuery.badQuery.params;
    const body = mocks.updateQuery.badQuery.body;
    it('should return a 404', async () => {
      const response = await supertest(app).put('/row').query(query).send(body);
      expect(response.statusCode).toBe(404);
    });
  });
});

describe('deleteRow endpoint', () => {
  describe('DELETE /row request on an existing entry in the database', () => {

    it('should return 201', async () => {
      const response = await supertest(app)
        .delete('/row')
        .query({ id: mocks.longDb.length + 1 });
      expect(response.statusCode).toBe(201);
    });
    it('should have deleted the entry in the database', async () => {
      const entry = await db.DownflowTable.findAll({
        where: {
          id: 53,
        },
      });
      expect(entry.length).toBeFalsy;
    });
  });

  describe('DELETE /row request on a non-existent entry in the database', () => {
    it('should return a 404', async () => {
      const response = await supertest(app)
        .delete('/row')
        .query({ id: mocks.longDb.length + 2 });
      expect(response.statusCode).toBe(404);
    });
  });
});