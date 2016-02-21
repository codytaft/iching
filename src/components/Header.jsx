// DEPRECATED
import React, { Component, PropTypes } from 'react';
import Router, {History, State} from 'react-router';
import { connect } from 'react-redux'
import { pushState } from 'redux-router'

import { AppBar, Card, CardHeader, CardTitle, CardText, Avatar, Icons, FlatButton, IconButton, FontIcon, Styles } from 'material-ui';
import  NavigationArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back';
import BrightnessHigh from 'material-ui/lib/svg-icons/image/brightness-7';

let headerPathToTitle = (path, params) => {
  /* Translate a route to it's title name */
  if (path === `/list`) {
      return {icon: <IconButton><NavigationArrowBack /></IconButton>,
              name: `All Hexagrams`}
  } else if (path === `/` || path === `/play`) {
      return {icon: <IconButton><BrightnessHigh /></IconButton>,
              name: `I-ching of the day`}
  } else if ( path.startsWith('/details') ) {
      return {icon: <IconButton><NavigationArrowBack /></IconButton>,
              name: `${params.name}`}
  } else {
    return {icon: <IconButton/>,
            name: 'I-ching'}
  }
}

let Header = React.createClass({

  render() {
    let info = headerPathToTitle(this.props.path, this.props.params)
    return (
      <div>
        <AppBar
        title={info.name}
        iconElementLeft={info.icon}
        onLeftIconButtonTouchTap={this.handleBackButton}
        />
      </div>
    );
  },

  handleBackButton( ev ) {
    console.log(ev.target)
    history.back()
  },

});

export default connect(
  state => {
    return {
      path: state.router.location.pathname,
      params: state.router.params
    }
  },
  { pushState }
)(Header);
