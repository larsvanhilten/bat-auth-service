// Because current Joi typings module is missing V16
//  @ts-ignore:
import joi from '@hapi/joi';
import axios from 'axios';
import errorHandler from '../../helpers/error-handler';
import { Request, Response } from 'express';

const schema = joi.object({
  access_token: joi
    .string()
    .alphanum()
    .required()
});

export default async (req: Request, res: Response) => {
  try {
    const { access_token } = await schema.validateAsync({ code: req.body.code });

    const headers = { Authorization: `Bearer ${access_token}` };
    const response = await axios.post('https://id.twitch.tv/oauth2/validate', null, { headers });
    const { login, user_id } = response.data;

    res.send({
      data: {
        login,
        user_id
      }
    });
  } catch (error) {
    const { code, response } = errorHandler(error);
    res.status(code).send(response);
  }
};
