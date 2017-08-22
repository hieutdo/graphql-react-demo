const mongoose = require('mongoose');
const SongType = require('./song.type');
const LyricType = require('./lyric.type');
const Lyric = mongoose.model('lyric');
const Song = mongoose.model('song');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    songs: {
      type: new GraphQLList(SongType),
      resolve: () => Song.find({}),
    },
    song: {
      type: SongType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (_, { id }) => Song.findById(id),
    },
    lyric: {
      type: LyricType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (_, { id }) => Lyric.findById(id),
    },
  }),
});

module.exports = RootQueryType;
