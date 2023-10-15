import mongoose, { Schema, model, models } from "mongoose";

const PictureSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    caption: {
        type: String,
        required: [true, 'Post is required.'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required.'],
    },
})

const Picture = models.Picture || model('Picture', PictureSchema);
export default Picture;