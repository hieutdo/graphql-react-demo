import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

class LyricList extends Component {
  async onLike(id) {
    await this.props.mutate({
      variables: { id }
    });
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content }) => (
      <li key={id} className="collection-item">
        {content}
        <i
          className="material-icons"
          onClick={() => this.onLike(id)}
        >
          thumb_up
        </i>
      </li>
    ));
  }

  render() {
    return (
      <ul className="collection">
        {this.renderLyrics()}
      </ul>
    );
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
