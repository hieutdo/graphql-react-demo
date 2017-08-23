import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetch-songs';

class SongList extends Component {
  async onSongDelete(id) {
    await this.props.mutate({
      variables: { id },
    });
    this.props.data.refetch();
  }

  renderSongs(songs) {
    return songs.map((song) => (
      <li key={song.id} className="collection-item">
        <Link to={`songs/${song.id}`}>
          {song.title}
        </Link>
        <i
          className="material-icons"
          onClick={() => this.onSongDelete(song.id)}
        >
          delete
        </i>
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

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(
  graphql(query)(SongList),
);
