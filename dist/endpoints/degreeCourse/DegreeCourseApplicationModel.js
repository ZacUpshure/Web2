import mongoose, { Schema } from 'mongoose';
const schema = new Schema({
    applicantUserID: { type: String, required: true },
    degreeCourseID: { type: String, required: true },
    targetPeriodYear: { type: Number, required: true },
    targetPeriodShortName: { type: String, required: true }
});
export const DegreeCourseApplicationModel = mongoose.model('DegreeCourseApplication', schema);
//# sourceMappingURL=DegreeCourseApplicationModel.js.map