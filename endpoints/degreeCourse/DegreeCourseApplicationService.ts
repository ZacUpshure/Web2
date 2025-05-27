import { DegreeCourseApplicationModel } from './DegreeCourseApplicationModel.js';
import {DegreeCourseModel} from "./DegreeCourseModel.js";
import {UpdateDegreeCourseApplicationDto} from "../../types/UpdateDegreeCourseApplicationDto.js";

interface CreateAppInput {
    applicantUserID: string;
    degreeCourseID: string;
    targetPeriodYear: number;
    targetPeriodShortName: string;
}

export async function deleteDegreeCourseApplication(applicantUserID: string) {
    return DegreeCourseApplicationModel.findOneAndDelete({ applicantUserID });
}

export async function updateDegreeCourseApplication(applicantUserID: string, data: UpdateDegreeCourseApplicationDto){
    return DegreeCourseApplicationModel.findOneAndUpdate({ applicantUserID }, data, {
        new: true,
        runValidators: true,
    })
}

export async function createApplication(input: CreateAppInput) {

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

export async function getMyApplications(applicantUserID: string) {
    return await DegreeCourseApplicationModel.find({ applicantUserID });
}

export async function getApplicationsByUserID(applicantUserID: string) {
    return await DegreeCourseApplicationModel.find({ applicantUserID });
}

export async function getApplicationsByDegreeCourseID(degreeCourseID: string) {
    return await DegreeCourseApplicationModel.find({ degreeCourseID });
}

