import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
  }

  async onSubmit(event) {
    event.preventDefault();
    await this.props.mutate({
      variables: {
        content: this.state.content,
        songId: this.props.songId,
      },
    });
    this.setState({ content: '' });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <input
          type="text"
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value })}
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
