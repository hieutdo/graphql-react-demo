const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = require('graphql');
const mongoose = require('mongoose');
const SongType = require('./types/song');
const LyricType = require('./types/lyric');
const Song = mongoose.model('song');
const Lyric = mongoose.model('lyric');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addSong: {
      type: SongType,
      args: {
        title: {
          type: GraphQLString,
        },
      },
      resolve: (_, { title }) => new Song({ title }).save(),
    },
    addLyricToSong: {
      type: SongType,
      args: {
        content: {
          type: GraphQLString,
        },
        songId: {
          type: GraphQLID,
        },
      },
      resolve: (_, { content, songId }) => Song.addLyric(songId, content),
    },
    likeLyric: {
      type: LyricType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve: (_, { id }) => Lyric.like(id),
    },
    deleteSong: {
      type: SongType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve: (_, { id }) => Song.remove({ _id: id }),
    },
  }),
});

module.exports = mutation;
