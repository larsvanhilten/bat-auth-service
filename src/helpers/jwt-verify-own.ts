import jwt from 'jsonwebtoken';

export default (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
