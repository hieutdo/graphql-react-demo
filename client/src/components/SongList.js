import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

class SongList extends Component {
  renderSongs(songs) {
    return songs.map((song) => (
      <li key={song.id}>{song.title}</li>
    ));
  }

  render() {
    const { loading, songs } = this.props.data;
    if (loading) {
      return <div>loading...</div>;
    }
    return (
      <ul>
        {this.renderSongs(songs)}
      </ul>
    );
  }
}

export default graphql(query)(SongList);
