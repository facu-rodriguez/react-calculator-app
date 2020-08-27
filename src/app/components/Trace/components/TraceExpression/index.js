import React, { PureComponent } from 'react';

import styles from './style.module.scss';

class TraceExpression extends PureComponent {
  handleValueClick = () => {
    this.props.handleClickTrace(this.props.id);
  };

  render() {
    return (
      <button onClick={this.handleValueClick} className={styles.traceElement}>
        {this.props.expression}
      </button>
    );
  }
}

export default TraceExpression;
