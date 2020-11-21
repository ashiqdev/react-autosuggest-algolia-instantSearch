import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import SingleBook from './components/SingleBook';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/posts/:id' component={SingleBook} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
