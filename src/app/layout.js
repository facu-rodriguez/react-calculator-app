import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { HOME, TRACE, FORM } from 'constants/routes';

import Home from './screens/Home';
import Trace from './screens/Trace';
import ReviewForm from './screens/Form';

const App = () => (
  <div>
    <Switch>
      <Route exact path={HOME} component={Home} />
      <Route exact path={TRACE} component={Trace} />
      <Route exact path={FORM} component={ReviewForm} />
      <Route render={() => <Redirect to={HOME} />} />
    </Switch>
  </div>
);

export default App;
