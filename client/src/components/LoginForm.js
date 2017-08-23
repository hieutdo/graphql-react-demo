import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import AuthForm from './AuthForm';
import login from '../queries/login';
import currentUser from '../queries/current-user';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }

  async onSubmit({ email, password }) {
    try {
      await this.props.mutate({
        variables: { email, password },
        refetchQueries: [{ query: currentUser }],
      });
    } catch (e) {
      const errors = e.graphQLErrors.map(err => err.message);
      this.setState({ errors });
    }
  }

  render() {
    return (
      <div>
        <h4>Login</h4>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(login)(LoginForm);
