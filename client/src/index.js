import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import App from './App';
import SongList from './components/SongList';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const client = new ApolloClient({});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={SongList} />
      </Route>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
