import React from 'react';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider  } from 'react-redux';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import invariant from 'redux-immutable-state-invariant';

import { AppContainer, PlayPage , ListPage, DetailPage } from './pages';

import { createHashHistory, createHistory } from 'history';
import { Router, Route, Link , IndexRoute, browserHistory} from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';

import reducers from './reducers';

let history = createHistory()
if ( __DEVELOPMENT__ ) {
  history = createHashHistory();
}

function configureStore( initialState ) {
  let fCreateStore = compose(
    applyMiddleware( invariant(), thunk ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = fCreateStore( reducers, initialState )

  return store;
}

function start() {
  // Create store
  let store = window.store = configureStore();

  render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" name="Iching of the day" component={AppContainer}>
          <Route name="hexagram-play" path="/play" component={PlayPage} />
          <Route name="hexagram-list" path="/list" component={ListPage} />
          <Route name="hexagram-details" path="/details/:number/:name" component={DetailPage} />
          <IndexRoute component={PlayPage} />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app-mount')
  );

  // add TapEvent
  injectTapEventPlugin();

  /* Loading complete */
  let load_el = document.getElementById('loading');
  load_el.parentNode.removeChild(load_el);
  document.body.class += 'loaded';
}


/* Update cache */
// Check if a new cache is available on page load.
window.addEventListener('load', function (e) {

  // Reset cache
  window.applicationCache.addEventListener('updateready', function () {
    if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
      // Browser downloaded a new app cache.
      // Swap it in and reload the page to get the new hotness.
      window.applicationCache.swapCache();
      window.location.reload();
    } else {
      // Manifest didn't changed. Nothing new to server.
    }
  }, false);

  // deviceready for ios/android
  console.log(`PHONEGAP? `, __PHONEGAP__ );
  if ( __PHONEGAP__ ) {
    document.addEventListener( 'deviceready', start );
  } else {
    start();
  }

}, false);

// force to import&compile css
import 'styles/main.scss';


// Report Errors
// err: error message
// fileName: which file error occurs in
// lineNumber: what line error occurs on
if ( __DEVELOPMENT__ ) {
  window.onerror = function (err, fileName, lineNumber) {
   // alert or console.log a message
   alert(fileName, 'Line:', lineNumber, 'Error:', err.message);
  };
}
