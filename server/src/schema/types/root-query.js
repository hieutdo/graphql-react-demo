const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');
const mongoose = require('mongoose');
const SongType = require('./song');
const LyricType = require('./lyric');
const UserType = require('./user');
const Lyric = mongoose.model('lyric');
const Song = mongoose.model('song');

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
    user: {
      type: UserType,
      resolve: (_, __, { user }) => user,
    },
  }),
});

module.exports = RootQueryType;
