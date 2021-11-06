import React from 'react';
import Login from './components/Login';
import Home from './components/Home';
import HeroInfo from "./components/hero/HeroInfo";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Redux
import { Provider} from 'react-redux';
import store from './store';

function App() {

  return (
      <Router>
      <Provider store={store}>
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Home} />
            <Route exact path="/HeroInfo" component={HeroInfo} />
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;