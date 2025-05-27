import { Router } from 'express';
import { UserModel } from "../user/UserModel.js";
import { requireAuth } from '../middleware/RequireAuth.js';
import { requireAdmin } from "../middleware/RequireAdmin.js";
import { createApplication, getMyApplications, getApplicationsByUserID, getApplicationsByDegreeCourseID, updateDegreeCourseApplication, deleteDegreeCourseApplication } from './DegreeCourseApplicationService.js';
const router = Router();
router.post('/', requireAuth, requireAdmin, async (req, res) => {
    try {
        const applicantUserID = req.user?.id; // aus JWT!
        if (!applicantUserID) {
            res.status(401).json({ message: 'Unauthorized – missing user ID' });
            return;
        }
        const application = await createApplication({ ...req.body, applicantUserID });
        res.status(201).json(application);
    }
    catch (err) {
        if (err.message === 'Missing required fields') {
            res.status(400).json({ message: 'Missing required fields' });
        }
        else if (err.message === 'DegreeCourseNotFound') {
            res.status(400).json({ message: 'DegreeCourseNotFound' });
        }
        else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
});
router.get('/myApplications', requireAuth, async (req, res) => {
    try {
        const applicantUserID = req.user?.id;
        if (!applicantUserID) {
            res.status(401).json({ message: 'Unauthorized – missing user ID' });
            return;
        }
        const applications = await getMyApplications(applicantUserID);
        res.status(200).json(applications);
    }
    catch (err) {
        res.status(500).json({ message: err.message || 'Error fetching applications' });
    }
});
router.get('/', requireAuth, requireAdmin, async (req, res) => {
    try {
        const { applicantUserID, degreeCourseID } = req.query;
        // suche nach bewerbungen für bestimmten studiengang
        if (typeof degreeCourseID === 'string' && degreeCourseID.trim() !== '') {
            const applications = await getApplicationsByDegreeCourseID(degreeCourseID);
            res.status(200).json(applications);
            return;
        }
        // bewerbungen eines bestimmten user
        if (typeof applicantUserID === 'string' && applicantUserID.trim() !== '') {
            const user = await UserModel.findOne({ userID: applicantUserID });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            const applications = await getApplicationsByUserID(user.id.toString());
            res.status(200).json(applications);
            return;
        }
        // kein gültiger parameter
        res.status(400).json({ message: 'Missing or invalid query parameter' });
    }
    catch (err) {
        res.status(500).json({ message: err.message || 'Server error' });
    }
});
router.put('/:applicantUserID', requireAuth, requireAdmin, async (req, res) => {
    try {
        const update = await updateDegreeCourseApplication(req.params.applicantUserID, req.body);
        res.status(200).json(update);
    }
    catch (error) {
    }
});
router.delete('/:applicantUserID', requireAuth, requireAdmin, async (req, res) => {
    try {
        await deleteDegreeCourseApplication(req.params.applicantUserID);
        res.status(204).end();
    }
    catch (error) {
    }
});
export default router;
//# sourceMappingURL=DegreeCourseApplicationRoutes.js.map