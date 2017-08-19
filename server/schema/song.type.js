const mongoose = require('mongoose');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require('graphql');
const LyricType = require('./lyric.type');
const Song = mongoose.model('song');

const SongType = new GraphQLObjectType({
  name: 'SongType',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    title: {
      type: GraphQLString,
    },
    lyrics: {
      type: new GraphQLList(LyricType),
      resolve: (parentValue) => Song.findLyrics(parentValue.id),
    },
  }),
});

module.exports = SongType;
