import { Router } from 'express';
import postAuthorize from './authorize/post';
import getAuthorize from './authorize/get';

export default (router: Router) => {
  router.get('/auth', getAuthorize);
  router.post('/auth', postAuthorize);

  return router;
};
