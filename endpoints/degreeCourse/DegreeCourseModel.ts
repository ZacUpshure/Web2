import mongoose, { Schema, Document } from 'mongoose';

// typ interface für DegreeCourseSchema
export interface IDegreeCourse extends Document {
    courseID: string;
    name: string;
    universityName: string;
    universityShortName: string;
    departmentName: string;
    departmentShortName: string;
    shortName: string;
    id?: string;
}

// DegreeCourseSchema
const DegreeCourseSchema = new Schema<IDegreeCourse>({
    courseID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    universityName: { type: String, required: true},
    universityShortName: { type: String, required: true },
    departmentName: { type: String, required: true },
    departmentShortName: { type: String, required: true },
    shortName: { type: String, required: true }
});

// mapping _id zu id ?


export const DegreeCourseModel = mongoose.model<IDegreeCourse>('DegreeCourse', DegreeCourseSchema);
