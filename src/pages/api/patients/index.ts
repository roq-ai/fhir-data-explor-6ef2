import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import {
  authorizationValidationMiddleware,
  errorHandlerMiddleware,
  notificationHandlerMiddleware,
} from 'server/middlewares';
import { patientValidationSchema } from 'validationSchema/patients';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getPatients();
    case 'POST':
      return createPatient();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPatients() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.patient
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'patient'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createPatient() {
    await patientValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.encounter?.length > 0) {
      const create_encounter = body.encounter;
      body.encounter = {
        create: create_encounter,
      };
    } else {
      delete body.encounter;
    }
    if (body?.medication?.length > 0) {
      const create_medication = body.medication;
      body.medication = {
        create: create_medication,
      };
    } else {
      delete body.medication;
    }
    if (body?.observation?.length > 0) {
      const create_observation = body.observation;
      body.observation = {
        create: create_observation,
      };
    } else {
      delete body.observation;
    }
    const data = await prisma.patient.create({
      data: body,
    });
    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
