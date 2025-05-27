import mongoose, { Schema, Document } from 'mongoose';

export interface IDegreeCourseApplication extends Document {
    applicantUserID: string;
    degreeCourseID: string;
    targetPeriodYear: number;
    targetPeriodShortName: string;
}

const schema = new Schema<IDegreeCourseApplication>({
    applicantUserID: { type: String, required: true },
    degreeCourseID: { type: String, required: true },
    targetPeriodYear: { type: Number, required: true },
    targetPeriodShortName: { type: String, required: true }
});

export const DegreeCourseApplicationModel = mongoose.model<IDegreeCourseApplication>(
    'DegreeCourseApplication',
    schema
);
