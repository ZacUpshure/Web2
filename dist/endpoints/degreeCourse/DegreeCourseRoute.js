import express from 'express';
import { requireAuth } from '../middleware/RequireAuth.js';
import { requireAdmin } from '../middleware/RequireAdmin.js';
import { getAllDegreeCourses, createDegreeCourse, updateDegreeCourse, deleteDegreeCourse } from './DegreeCourseService.js';
export const degreeCourseRouter = express.Router();
// GET /api/degreeCourses?universityShortName=ABC
degreeCourseRouter.get('/', async (req, res) => {
    const universityShortName = req.query.universityShortName;
    const courses = await getAllDegreeCourses(universityShortName);
    res.status(200).json(courses);
});
// Schreib-Operationen absichern
degreeCourseRouter.use(requireAuth, requireAdmin);
// POST
degreeCourseRouter.post('/', async (req, res) => {
    const course = await createDegreeCourse(req.body);
    res.status(201).json(course);
});
// PUT
degreeCourseRouter.put('/:courseID', async (req, res) => {
    const updated = await updateDegreeCourse(req.params.courseID, req.body);
    res.status(200).json(updated);
});
// DELETE
degreeCourseRouter.delete('/:courseID', async (req, res) => {
    await deleteDegreeCourse(req.params.courseID);
    res.status(204).send();
});
//# sourceMappingURL=DegreeCourseRoute.js.map