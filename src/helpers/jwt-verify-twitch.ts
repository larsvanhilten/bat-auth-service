import util from 'util';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const client = jwksClient({
  jwksUri: 'https://id.twitch.tv/oauth2/keys'
});

const getKey = (header: any, callback: any) =>
  client.getSigningKey(header.kid, (err, key: any) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });

const jwtVerifyAsync = util.promisify(jwt.verify);

export default (token: string): any => {
  return jwtVerifyAsync(token, getKey);
};
