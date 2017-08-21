import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import gql from 'graphql-tag';

class SongList extends Component {
  renderSongs(songs) {
    return songs.map((song) => (
      <li key={song.id} className="collection-item">
        {song.title}
      </li>
    ));
  }

  render() {
    const { loading, songs } = this.props.data;
    if (loading) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <ul className="collection">
          {this.renderSongs(songs)}
        </ul>
        <Link
          className="btn-floating btn-large red right"
          to="/songs/new">
          <i className="large material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const query = gql`
  query {
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(SongList);
