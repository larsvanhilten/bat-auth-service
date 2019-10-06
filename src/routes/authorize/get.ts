// Because current Joi typings module is missing V16
//  @ts-ignore:
import joi from '@hapi/joi';
import { Request, Response } from 'express';
import axios from 'axios';
import errorHandler from '../../helpers/error-handler';
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

export interface AuthToken {
  access_token: string;
  // refresh_token: string;
  expires_in: number;
  scope: string;
  id_token: string;
  token_type: string;
}

const schema = joi.object({
  code: joi
    .string()
    .alphanum()
    .required()
});

/*
{
  "data": {
    "id": 1001,
    "name": "Wing"
  }
}
*/

export default async (req: Request, res: Response) => {
  try {
    const { code } = await schema.validateAsync({ code: req.body.code, client_id: req.body.client_id });

    const searchParams = [
      ['client_id', CLIENT_ID],
      ['client_secret', CLIENT_SECRET],
      ['grant_type', 'authorization_code'],
      ['redirect_uri', REDIRECT_URI],
      ['code', code]
    ];
    const query = new URLSearchParams(searchParams);
    const response = await axios.post('https://id.twitch.tv/oauth2/token', query);
    res.send(response);
  } catch (error) {
    const { code, response } = errorHandler(error);
    res.status(code).send(response);
  }
};
