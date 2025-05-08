import { DegreeCourseModel } from './DegreeCourseModel.js';
export async function getAllDegreeCourses(universityShortName) {
    const filter = universityShortName ? { universityShortName } : {};
    return DegreeCourseModel.find(filter).lean();
}
export async function createDegreeCourse(data) {
    return await new DegreeCourseModel(data).save();
}
export async function updateDegreeCourse(courseID, data) {
    return DegreeCourseModel.findOneAndUpdate({ courseID }, data, {
        new: true,
        runValidators: true
    });
}
export async function deleteDegreeCourse(courseID) {
    return DegreeCourseModel.findOneAndDelete({ courseID });
}
//# sourceMappingURL=DegreeCourseService.js.map