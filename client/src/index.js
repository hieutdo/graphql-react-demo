import 'materialize-css/dist/css/materialize.css';
import './index.css';

import { hashHistory, IndexRoute, Route, Router } from 'react-router';
import { ApolloProvider, createNetworkInterface } from 'react-apollo';
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import App from './App';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
  dataIdFromObject: o => o.id,
  networkInterface: createNetworkInterface({
    uri: '/graphql',
    opts: {
      credentials: 'same-origin',
    },
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={SongList} />
        <Route path="songs/new" component={SongCreate} />
        <Route path="songs/:id" component={SongDetail} />
      </Route>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
