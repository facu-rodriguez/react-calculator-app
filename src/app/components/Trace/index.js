import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import TraceExpression from './components/TraceExpression';
import styles from './style.module.scss';
import { element } from 'prop-types';

class Trace extends PureComponent {
  handleValuePress = e => {
    switch (e.keyCode) {
      case 8:
        this.props.handleClickNewExpression('delete');
        break;
      case 13:
        this.props.handleClickNewExpression('=');
        break;
      default:
        this.props.handleClickNewExpression(e.key);
        break;
    }
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
      <div className={styles.traceContainer}>
        <h1 className={styles.traceTittle}>Trace</h1>
        <div className={styles.traceElementContainer}>
          <input
            className={styles.traceInput}
            type="text"
            value={this.props.value}
            onKeyDown={this.handleValuePress}
          />
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
