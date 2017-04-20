import React, { Component, PropTypes  } from 'react';
import ReactDOM , { render } from 'react-dom';
import { connect } from 'react-redux';

import { Router, Route, Link } from 'react-router';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import Footer from '../components/Footer';

import { PlayPage , ListPage, DetailPage } from './index'



class AppContainer extends React.Component {

  componentWillUpdate() {
    this.scrollTopTop()
  }

  render() {
    console.log(this.props)
    /* <Header location={this.props.location} params={this.props.params} /> */
    return (
      <div className="app-wrap">
        <div className="content" ref="content">
          <CSSTransitionGroup
            component="div"
            transitionName="page-transition" transitionAppear
            transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}>

            <Route path="/" component={PlayPage} />
            <Route path="/list" component={ListPage} />
            <Route path="/details/:number/:name" component={DetailPage} />

            { /* {React.cloneElement(this.props.children, {key: this.props.location.pathname})} */ }
           </CSSTransitionGroup>
        </div>
        <Footer location={this.props.location} />
      </div>
    );
  }

  scrollTopTop() {
    let el = this.refs.content
    el.scrollTop = 0
  }

}

export default connect(
  null
)(AppContainer);
