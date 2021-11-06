import db from '@src/models';
import * as express from 'express';
import { Op } from 'sequelize';

export const getTable = async (req: express.Request, res: express.Response) => {
  try {
    const params = req.query;
    const limit = Number(params.count);
    const offset = Number(params.offset);
    const column = params.column;
    const direction = params.direction;
    if (!limit || typeof offset === 'undefined' || !column || !direction)
      return res.sendStatus(400);
    const table = await db.DownflowTable.findAll({
      order: [[column, direction]],
      limit: limit,
      offset: offset,
    });
    return res.status(200).send(table);
  } catch (oO) {
    console.log(oO);
    return res.sendStatus(500);
  }
};

export const getCount = async (req: express.Request, res: express.Response) => {
  try {
    const totalCount = await db.DownflowTable.count();
    return res.status(200).send({ totalCount: totalCount });
  } catch (oO) {
    console.log(oO);
    return res.sendStatus(500);
  }
};

export const postRow = async (req: express.Request, res: express.Response) => {
  try {
    const data = req.body;
    if (!data.lastName || !data.firstName) return res.sendStatus(403);
    const row = await db.DownflowTable.create({
      lastName: data.lastName,
      firstName: data.firstName,
      flatEarther: data.flatEarther,
      wallet: data.wallet,
    });
    return res.status(201).send(row.dataValues);
  } catch (oO) {
    console.log(oO);
    return res.sendStatus(500);
  }
};

export const updateRow = async (req: express.Request, res: express.Response) => {
  try {
    const data = req.body;
    const params = req.query;
    const row = await db.DownflowTable.update(
      { [params.column as string]: data.newValue },
      {
        where: {
          id: params.id,
        },
      }
    );
    if (row[0] === 0) return res.sendStatus(404);
    return res.sendStatus(201);
  } catch (oO) {
    console.log(oO);
    return res.sendStatus(500);
  }
};

export const deleteRow = async (req: express.Request, res: express.Response) => {
  try {
    const params = req.query;
    const row = await db.DownflowTable.destroy({
      where: {
        id: params.id,
      },
    });
    if (!row) return res.sendStatus(404);
    return res.sendStatus(201);
  } catch (oO) {
    console.log(oO);
    return res.sendStatus(500);
  }
};

export const postManyRows = async (req: express.Request, res: express.Response) => {
  try {
    const data = req.body;
    const response = await db.DownflowTable.bulkCreate(data);
    const body = response.map((dbresponse: any) => dbresponse.dataValues);
    return res.status(201).send(body);
  } catch (oO) {
    console.log(oO);
    return res.sendStatus(500);
  }
};

export const deleteAllRows = async (req: express.Request, res: express.Response) => {
  try {
    const row = await db.DownflowTable.destroy({ where: {}, truncate: true });
    if (!row) return res.sendStatus(404);
    return res.sendStatus(201);
  } catch (oO) {
    console.log(oO);
    return res.sendStatus(500);
  }
};
