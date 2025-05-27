import { DegreeCourseApplicationModel } from './DegreeCourseApplicationModel.js';
import { DegreeCourseModel } from "./DegreeCourseModel.js";
export async function deleteDegreeCourseApplication(applicantUserID) {
    return DegreeCourseApplicationModel.findOneAndDelete({ applicantUserID });
}
export async function updateDegreeCourseApplication(applicantUserID, data) {
    return DegreeCourseApplicationModel.findOneAndUpdate({ applicantUserID }, data, {
        new: true,
        runValidators: true,
    });
}
export async function createApplication(input) {
    // einfache Validierung
    const { applicantUserID, degreeCourseID, targetPeriodYear, targetPeriodShortName } = input;
    if (!applicantUserID || !degreeCourseID || !targetPeriodYear || !targetPeriodShortName) {
        throw new Error('Missing required fields');
    }
    const courseExists = await DegreeCourseModel.findOne({ courseID: degreeCourseID });
    if (!courseExists) {
        throw new Error('DegreeCourseNotFound');
    }
    return await DegreeCourseApplicationModel.create({
        applicantUserID,
        degreeCourseID,
        targetPeriodYear,
        targetPeriodShortName
    });
}
export async function getMyApplications(applicantUserID) {
    return await DegreeCourseApplicationModel.find({ applicantUserID });
}
export async function getApplicationsByUserID(applicantUserID) {
    return await DegreeCourseApplicationModel.find({ applicantUserID });
}
export async function getApplicationsByDegreeCourseID(degreeCourseID) {
    return await DegreeCourseApplicationModel.find({ degreeCourseID });
}
//# sourceMappingURL=DegreeCourseApplicationService.js.map