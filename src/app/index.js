import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import App from './layout';

class AppContainer extends PureComponent {
  render() {
    return <App />;
  }
}

export default connect()(AppContainer);
