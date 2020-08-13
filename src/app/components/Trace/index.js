import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import TraceExpression from './components/TraceExpression';
import styles from './style.module.scss';
import { element } from 'prop-types';

class Trace extends PureComponent {
  handleValuePress = () => {
    this.props.handleClick(this.props.value);
  };

  handleRenderExpression = objectExpression => (
    <TraceExpression
      handleClickTrace={this.props.handleClickTrace}
      expression={objectExpression.expression}
      id={objectExpression.id}
    />
  );

  render() {
    return (
      <div>
        <h1 className={styles.traceTittle}>Trace</h1>
        <div className={styles.traceElementContainer}>
          <input type="text" value={this.props.value} onClick={this.handleValuePress}></input>
          {this.props.expression.traceExpression.map(objectExpression =>
            this.handleRenderExpression(objectExpression)
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  expression: store.traceExpression
});

export default connect(mapStateToProps)(Trace);