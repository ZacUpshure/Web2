import express from 'express';
import { authenticateUser } from './AuthenticationService.js';
const router = express.Router();
router.get('/authenticate', (req, res) => {
    authenticateUser(req, res);
});
export default router;
//# sourceMappingURL=AuthenticationRoute.js.map