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

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

PromptSchema.virtual('like', {
    ref: 'Like',
    foreignField: 'post',
    localField: '_id',
});


const Prompt = models.Prompt || model("Prompt", PromptSchema)

export default Prompt;
