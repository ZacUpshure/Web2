import express from 'express';
import {Router} from 'express';
import { requireAuth } from '../middleware/RequireAuth.js';
import { requireAdmin } from '../middleware/RequireAdmin.js';
import { getApplicationsByDegreeCourseID } from "./DegreeCourseApplicationService.js";
import {
    getAllDegreeCourses,
    getDegreeCourse,
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

// GET /api/degreeCourses/:courseID
degreeCourseRouter.get('/:courseID', async (req, res): Promise<void> => {
    try {
        // parameter fischen
        const courseID = req.params.courseID;
        // Service anfragen und antwort abwarten.
        const degreeCourse = await getDegreeCourse(courseID);
        // antwort senden
        res.status(200).json(degreeCourse);
    } catch (error: any) {
        if (error.message === 'Degree course does not exist') {
            res.status(400).json({error: error.message});
        } else {
            res.status(400).json({error: 'Internal Server Error'});
        }
    }
})

// schreib operationen absichern.
degreeCourseRouter.use(
    requireAuth,
    requireAdmin
);

// POST
degreeCourseRouter.post('/', async (req, res):Promise<void> => {
    try {
        // ruft degree course service create auf mit dem request body.
        const course = await createDegreeCourse(req.body);
        res.status(201).json(course);
    } catch (error: any) {
        if (error.message === 'Course ID is required') {
            res.status(400).json({ error: 'Course ID is required' });
        } else if (error.message === 'Degree Course already exists'){
            res.status(400).json({ error: 'Degree Course already exists' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

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

// Admin kann alle bewerbungen über einen bestimmten Studiengang abrufen
degreeCourseRouter.get('/:id/degreeCourseApplications', requireAuth, requireAdmin, async (req, res):Promise<void> => {
    try {
        const degreeCourseID = req.params.id;

        if (!degreeCourseID || typeof degreeCourseID !== 'string') {
            res.status(400).json({ message: 'Invalid degree course ID' });
            return
        }

        const applications = await getApplicationsByDegreeCourseID(degreeCourseID);
        res.status(200).json(applications);
        return
    } catch (err: any) {
        res.status(500).json({ message: err.message || 'Server error' });
    }
});