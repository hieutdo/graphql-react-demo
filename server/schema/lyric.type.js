const mongoose = require('mongoose');
const Lyric = mongoose.model('lyric');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} = require('graphql');

const LyricType = new GraphQLObjectType({
  name: 'LyricType',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    likes: {
      type: GraphQLInt,
    },
    content: {
      type: GraphQLString,
    },
    song: {
      type: require('./song.type'),
      resolve: async (parentValue) => {
        const { song } = await Lyric.findById(parentValue.id).populate('song');
        return song;
      },
    },
  }),
});

module.exports = LyricType;
