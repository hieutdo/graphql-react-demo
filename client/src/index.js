import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import App from './App';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import registerServiceWorker from './registerServiceWorker';
import 'materialize-css/dist/css/materialize.css';

const client = new ApolloClient({});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={SongList} />
        <Route path="songs/new" component={SongCreate} />
      </Route>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
