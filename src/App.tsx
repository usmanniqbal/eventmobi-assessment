import React from 'react';
import './App.css';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import List from './components/gist/List';

class App extends React.Component<RouteComponentProps<any>> {
  public render() {
    return (
      <div>
        <Switch>
          <Route path={'/'} exact component={List} />
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);

