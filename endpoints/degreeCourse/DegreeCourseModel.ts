import mongoose, { Schema, Document } from 'mongoose';

// typ interface für DegreeCourseSchema
export interface IDegreeCourse extends Document {
    courseID: string;
    name: string;
    universityShortName: string;
}

// DegreeCourseSchema
const DegreeCourseSchema = new Schema<IDegreeCourse>({
    courseID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    universityShortName: { type: String, required: true }
});

export const DegreeCourseModel = mongoose.model<IDegreeCourse>('DegreeCourse', DegreeCourseSchema);
