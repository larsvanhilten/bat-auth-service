import joi from '@hapi/joi';
import errorHandler from '../../helpers/error-handler';
import { Request, Response } from 'express';
import verifyOwnToken from '../../helpers/jwt-verify-own';

const schema = joi.object({
  authorization: joi.string().required()
});

export default async (req: Request, res: Response) => {
  try {
    const { authorization } = await schema.validateAsync({ authorization: req.header('authorization') });
    verifyOwnToken(authorization.replace('Bearer', ''));

    res.send({
      data: {
        message: 'Successful authorization'
      }
    });
  } catch (error) {
    const { code, response } = errorHandler(error);
    res.status(code).send(response);
  }
};
