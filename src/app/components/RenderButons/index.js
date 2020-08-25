import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Button from '../Buton';

import { BUTTONS_CONFIG } from './constants';
import styles from './style.module.scss';

class ButonsConfig extends PureComponent {
  setButtonValues = () =>
    BUTTONS_CONFIG.map(i => (
      <Button
        className={i.className}
        classNameSelect={this.props.trace.length > 0 && i.classNameSelect}
        value={i.value}
        handleClick={this.props.handleClick}
        text={i.text}
      />
    ));

  render() {
    return this.setButtonValues();
  }
}

const mapStateToProps = store => ({
  trace: store.traceExpression.traceExpression
});

export default connect(mapStateToProps)(ButonsConfig);
