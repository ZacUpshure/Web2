import express from 'express';
import { getAdmins } from '../abnahme/abnahmeService.js';
// neuer Router
const router = express.Router();
// getAdmins
router.get('/getAdmins', (req, res) => {
    getAdmins(req, res); // req und res dürfen im service nicht auftauchen
});
export default router;
//# sourceMappingURL=abnahmeRoute.js.map