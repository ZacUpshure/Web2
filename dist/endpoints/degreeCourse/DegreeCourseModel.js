import mongoose, { Schema } from 'mongoose';
const DegreeCourseSchema = new Schema({
    courseID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    universityShortName: { type: String, required: true }
});
export const DegreeCourseModel = mongoose.model('DegreeCourse', DegreeCourseSchema);
//# sourceMappingURL=DegreeCourseModel.js.map