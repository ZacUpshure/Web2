import { DegreeCourseModel } from './DegreeCourseModel.js';
import { CreateDegreeCourseDto, UpdateDegreeCourseDto } from '../../types/DegreeCourseDTO.js';

// get all degreecourses with uni short name.
export async function getAllDegreeCourses(universityShortName?: string) {
    const filter = universityShortName ? { universityShortName } : {};
    // ruft model mit gefiltertem uni short name auf.
    return DegreeCourseModel.find(filter).lean();
}

// get by id or courseID
export async function getDegreeCourse(courseID: string){
    // find by id über findOne({ ... })
    const degreeCourse = await DegreeCourseModel.findOne({ courseID });
    // prüfen ob der kurs existiert.
    if (!degreeCourse) throw new Error('Degree course does not exist');
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
export async function createDegreeCourse(data: CreateDegreeCourseDto) {
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
export async function updateDegreeCourse(courseID: string, data: UpdateDegreeCourseDto) {
    // ruft model auf um einen degreecourse mit einer angegebenen id zu finden und zu bearbeiten.
    return DegreeCourseModel.findOneAndUpdate({ courseID }, data, {
        new: true,
        runValidators: true
    });
}

// delete degreecourse
export async function deleteDegreeCourse(courseID: string) {
    // ruft model auf um einen degree course mit einer id zu löschen.
    return DegreeCourseModel.findOneAndDelete({ courseID });
}
