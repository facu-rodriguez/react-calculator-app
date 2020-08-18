import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { HOME, TRACE } from 'constants/routes';

import Home from './screens/Home';
import Trace from './screens/Trace';
import styles from './styles.module.scss';

const App = () => (
  <div className={styles.container}>
    <Switch>
      <Route exact path={HOME} component={Home} />
      <Route exact path={TRACE} component={Trace} />
      <Route render={() => <Redirect to={HOME} />} />
    </Switch>
  </div>
);

export default App;
