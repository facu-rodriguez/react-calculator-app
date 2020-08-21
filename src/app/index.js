import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import App from './layout';
import store from 'redux/store';
import traceExpressionActions from 'redux/traceExpression/actions';

import ButonsConfig from 'app/components/RenderButons';
import Input from 'app/components/Input';
import Trace from 'app/components/Trace';

import styles from './styles.module.scss';
import { defaultState } from 'redux/traceExpression/reducer';

class AppContainer extends PureComponent {
  render() {
    return <App />;
  }
}

export default connect()(AppContainer);
