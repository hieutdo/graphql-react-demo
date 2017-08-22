const mongoose = require('mongoose');
const { Schema } = mongoose;

const LyricSchema = new Schema({
  song: {
    type: Schema.Types.ObjectId,
    ref: 'song',
  },
  likes: {
    type: Number,
    default: 0,
  },
  content: {
    type: String,
  },
});

LyricSchema.statics.like = async function (id) {
  const lyric = await this.findById(id);
  lyric.likes++;
  return await lyric.save();
};

mongoose.model('lyric', LyricSchema);
