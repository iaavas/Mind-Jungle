import { Schema, model, models } from 'mongoose'


const commentSchema = new Schema(
    {
        comment: {
            type: String,
        },


        prompt: {
            type: Schema.Types.ObjectId,
            ref: 'Prompt',
            required: [true, 'Comment must belong to a tour'],
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Comment must belong to a user'],
        },
        createdAt: { type: Date, default: Date.now },

    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

commentSchema.pre(/^find/, function (next) {
    // @ts-ignore
    this.sort({ createdAt: -1 });
    next();
});


const Comment = models.Comment || model('Comment', commentSchema);

export default Comment;
