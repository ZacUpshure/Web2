import { DegreeCourseModel } from './DegreeCourseModel.js';
import { CreateDegreeCourseDto, UpdateDegreeCourseDto } from '../../types/DegreeCourseDTO.js';

export async function getAllDegreeCourses(universityShortName?: string) {
    const filter = universityShortName ? { universityShortName } : {};
    return DegreeCourseModel.find(filter).lean();
}

export async function createDegreeCourse(data: CreateDegreeCourseDto) {
    return await new DegreeCourseModel(data).save();
}

export async function updateDegreeCourse(courseID: string, data: UpdateDegreeCourseDto) {
    return DegreeCourseModel.findOneAndUpdate({ courseID }, data, {
        new: true,
        runValidators: true
    });
}

export async function deleteDegreeCourse(courseID: string) {
    return DegreeCourseModel.findOneAndDelete({ courseID });
}
