import { Router } from 'express';
import postAuthorize from './authorize/post';

export default (router: Router) => {
  router.post('/auth', postAuthorize);

  return router;
};
