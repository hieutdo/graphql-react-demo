const mongoose = require('mongoose');
const { Schema } = mongoose;

const SongSchema = new Schema({
  title: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  lyrics: [{
    type: Schema.Types.ObjectId,
    ref: 'lyric',
  }],
});

SongSchema.statics.addLyric = async (id, content) => {
  const song = await this.findById(id);
  const Lyric = mongoose.model('lyric');
  const lyric = new Lyric({ content, song });

  song.lyrics.push(lyric);

  await Promise.all([
    lyric.save(),
    song.save(),
  ]);

  return song;
};

SongSchema.statics.findLyrics = async (id) => {
  const { lyrics } = await this.findById(id).populate('lyrics');
  return lyrics;
};

mongoose.model('song', SongSchema);
