import jwt from 'jsonwebtoken';

export default (data: object) => jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '8h' });
