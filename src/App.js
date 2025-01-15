import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  state = {
    progress: 0,
  };
  setProgress = (value) => {
    this.setState({
      progress: value,
    });
  };
  render() {
    return (
      <>
        <Router>
          <LoadingBar
            color={'#2acdee'}
            progress={this.state.progress}
            onLoaderFinished={() =>
              this.setState({
                progress: 0,
              })
            }
            height={3}
          />
          <Navbar />
          <Routes>
            <Route path='/' element={<Navigate to='/general' />} />
            <Route
              path='/general'
              element={
                <News
                  setProgress={this.setProgress}
                  key={'general'}
                  pageSize={9}
                  category='general'
                  heading='General'
                />
              }
            />
            <Route
              path='/business'
              element={
                <News
                  setProgress={this.setProgress}
                  key={'business'}
                  pageSize={9}
                  category='business'
                  heading='Business'
                />
              }
            />
            <Route
              path='/technology'
              element={
                <News
                  setProgress={this.setProgress}
                  key={'technology'}
                  pageSize={9}
                  category='technology'
                  heading='Technology'
                />
              }
            />
            <Route
              path='/sports'
              element={
                <News
                  setProgress={this.setProgress}
                  key={'sports'}
                  pageSize={9}
                  category='sports'
                  heading='Sports'
                />
              }
            />
            <Route
              path='/science'
              element={
                <News
                  setProgress={this.setProgress}
                  key={'science'}
                  pageSize={9}
                  category='science'
                  heading='Science'
                />
              }
            />
            <Route
              path='/health'
              element={
                <News
                  setProgress={this.setProgress}
                  key={'health'}
                  pageSize={9}
                  category='health'
                  heading='Health'
                />
              }
            />
            <Route
              path='/entertainment'
              element={
                <News
                  setProgress={this.setProgress}
                  key={'entertainment'}
                  pageSize={9}
                  category='entertainment'
                  heading='Entertainment'
                />
              }
            />
          </Routes>
        </Router>
      </>
    );
  }
}
