import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetch-songs';

class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
  }

  async onSubmit(event) {
    event.preventDefault();
    await this.props.mutate({
      variables: {
        title: this.state.title,
      },
      refetchQueries: [{ query }],
    });
    hashHistory.push('/');
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a new Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            type="text"
            value={this.state.title}
            onChange={event => this.setState({ title: event.target.value })}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
