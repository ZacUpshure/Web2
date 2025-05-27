import { DegreeCourseModel } from './DegreeCourseModel.js';
// get all degreecourses with uni short name.
export async function getAllDegreeCourses(universityShortName) {
    const filter = universityShortName ? { universityShortName } : {};
    // ruft model mit gefiltertem uni short name auf.
    return DegreeCourseModel.find(filter).lean();
}
// get by id or courseID
export async function getDegreeCourse(courseID) {
    // find by id über findOne({ ... })
    const degreeCourse = await DegreeCourseModel.findOne({ courseID });
    // prüfen ob der kurs existiert.
    if (!degreeCourse)
        throw new Error('Degree course does not exist');
    // kurs wiedergeben.
    return {
        courseID: degreeCourse.courseID,
        name: degreeCourse.name,
        universityName: degreeCourse.universityName,
        universityShortName: degreeCourse.universityShortName,
        departmentName: degreeCourse.departmentName,
        departmentShortName: degreeCourse.departmentShortName,
        shortName: degreeCourse.shortName,
        id: degreeCourse.id
    };
}
// create degreecourse
export async function createDegreeCourse(data) {
    if (!data.courseID) {
        throw new Error('Course ID is required');
    }
    // object destructuring
    const { courseID } = data;
    // degreeCourse suchen nach eingegebener id
    const existingDegreeCourse = await DegreeCourseModel.findOne({ courseID });
    if (existingDegreeCourse) {
        throw new Error('Degree Course already exists');
    }
    // ruft model auf um einen neuen degree course zu erstellen.
    return await new DegreeCourseModel(data).save();
}
// update degreecourse
export async function updateDegreeCourse(courseID, data) {
    // ruft model auf um einen degreecourse mit einer angegebenen id zu finden und zu bearbeiten.
    return DegreeCourseModel.findOneAndUpdate({ courseID }, data, {
        new: true,
        runValidators: true
    });
}
// delete degreecourse
export async function deleteDegreeCourse(courseID) {
    // ruft model auf um einen degree course mit einer id zu löschen.
    return DegreeCourseModel.findOneAndDelete({ courseID });
}
//# sourceMappingURL=DegreeCourseService.js.map