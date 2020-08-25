import React, { PureComponent } from 'react';

import styles from './style.module.scss';

class TraceExpression extends PureComponent {
  handleValueClick = () => {
    this.props.handleClickTrace(this.props.id);
  };

  render() {
    return (
      <p onClick={this.handleValueClick} className={styles.traceElement}>
        {this.props.expression}
      </p>
    );
  }
}

export default TraceExpression;
