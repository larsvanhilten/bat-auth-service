// Because current Joi typings module is missing V16
//  @ts-ignore:
import joi from '@hapi/joi';
import axios from 'axios';
import errorHandler from '../../helpers/error-handler';
import { Request, Response } from 'express';

const schema = joi.object({
  code: joi
    .string()
    .alphanum()
    .required()
});

export default async (req: Request, res: Response) => {
  try {
    const { code } = await schema.validateAsync({ code: req.body.code });
    const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

    const params = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI,
      code
    };
    const response = await axios.post('https://id.twitch.tv/oauth2/token', null, { params });
    const { access_token, expires_in, id_token, token_type } = response.data;

    res.send({
      data: {
        access_token,
        id_token,
        expires_in,
        token_type
      }
    });
  } catch (error) {
    const { code, response } = errorHandler(error);
    res.status(code).send(response);
  }
};
