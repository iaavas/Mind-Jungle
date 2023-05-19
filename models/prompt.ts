import { Schema, model, models } from 'mongoose'


const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',

    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required']
    },
    tag: {
        type: String,
        required: [true, 'Tag is required']
    },
    likes: {
        type: Number,
        default: 0,
        min: 0
    },
    likedBy: [{
        type: String,


    }],
    createdAt: { type: Date, default: Date.now }



}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

// PromptSchema.virtual('comments', {
//     ref: 'Comment',
//     foreignField: 'prompt',
//     localField: '_id',
// });
PromptSchema.virtual('comments', {
    ref: 'Comment',
    foreignField: 'prompt',
    localField: '_id',
});






const Prompt = models.Prompt || model("Prompt", PromptSchema)

export default Prompt;
