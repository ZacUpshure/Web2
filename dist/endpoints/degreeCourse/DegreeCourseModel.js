import mongoose, { Schema } from 'mongoose';
// DegreeCourseSchema
const DegreeCourseSchema = new Schema({
    courseID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    universityName: { type: String, required: true },
    universityShortName: { type: String, required: true },
    departmentName: { type: String, required: true },
    departmentShortName: { type: String, required: true },
    shortName: { type: String, required: true }
});
// mapping _id zu id ?
export const DegreeCourseModel = mongoose.model('DegreeCourse', DegreeCourseSchema);
//# sourceMappingURL=DegreeCourseModel.js.map