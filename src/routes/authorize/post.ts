// Because current Joi typings module is missing V16
//  @ts-ignore:
import joi from '@hapi/joi';
import axios from 'axios';
import errorHandler from '../../helpers/error-handler';
import { Request, Response } from 'express';
import verifyTwitchToken from '../../helpers/jwt-verify-twitch';
import signJwt from '../../helpers/jwt-sign';

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
    const { id_token } = response.data;

    const { preferred_username } = await verifyTwitchToken(id_token);
    const token = signJwt({ username: preferred_username });

    res.send({
      data: {
        token,
        token_type: 'bearer'
      }
    });
  } catch (error) {
    const { code, response } = errorHandler(error);
    res.status(code).send(response);
  }
};
