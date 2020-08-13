import React, { PureComponent } from 'react';

import styles from './style.module.scss';

class TraceExpression extends PureComponent {
  handleValueClick = () => {
    console.log(this.props);
    // this.props.handleValueClick.handleClickTrace(
    //   this.props.expression,
    //   this.props.handleValueClick.expression.traceExpression.indexOf(this.props.expression)
    // );
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
