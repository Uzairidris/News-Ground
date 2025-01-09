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

export default class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Navbar />

          <Routes>
            <Route path='/' element={<Navigate to='/general' />} />
            <Route
              path='/general'
              element={
                <News
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
