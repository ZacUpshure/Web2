import { DegreeCourseModel } from './DegreeCourseModel.js';
import { CreateDegreeCourseDto, UpdateDegreeCourseDto } from '../../types/DegreeCourseDTO.js';

// get all degreecourses with uni short name.
export async function getAllDegreeCourses(universityShortName?: string) {
    const filter = universityShortName ? { universityShortName } : {};
    // ruft model mit gefiltertem uni short name auf.
    return DegreeCourseModel.find(filter).lean();
}

// create degreecourse
export async function createDegreeCourse(data: CreateDegreeCourseDto) {
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
