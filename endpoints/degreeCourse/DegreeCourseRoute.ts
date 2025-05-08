import express from 'express';
import {Router} from 'express';
import { requireAuth } from '../middleware/RequireAuth.js';
import { requireAdmin } from '../middleware/RequireAdmin.js';
import {
    getAllDegreeCourses,
    createDegreeCourse,
    updateDegreeCourse,
    deleteDegreeCourse
} from './DegreeCourseService.js';

// erstellt Router
export const degreeCourseRouter: Router = express.Router();

// GET /api/degreeCourses?universityShortName=ABC.
degreeCourseRouter.get('/', async (req, res):Promise<void> => {
    const universityShortName = req.query.universityShortName as string | undefined;
    // ruft degreecourse service get all mit uni short name auf.
    const courses = await getAllDegreeCourses(universityShortName);
    res.status(200).json(courses);
});

// schreib operationen absichern.
degreeCourseRouter.use(
    requireAuth,
    requireAdmin
);

// POST
degreeCourseRouter.post('/', async (req, res):Promise<void> => {
    // ruft degree course service create auf mit dem request body.
    const course = await createDegreeCourse(req.body);
    res.status(201).json(course);
});

// PUT
degreeCourseRouter.put('/:courseID', async (req, res):Promise<void> => {
    // ruft degree course service update auf mit courseID und request body.
    const updated = await updateDegreeCourse(req.params.courseID, req.body);
    res.status(200).json(updated);
});

// DELETE
degreeCourseRouter.delete('/:courseID', async (req, res):Promise<void> => {
    // ruft degree course service delete mit course ID auf.
    await deleteDegreeCourse(req.params.courseID);
    res.status(204).send();
});
