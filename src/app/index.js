import React, { PureComponent } from 'react';
import store from 'redux/store';
import traceExpressionActions from 'redux/traceExpression/actions';
import { connect } from 'react-redux';

import ButonsConfig from 'app/components/RenderButons';
import Input from 'app/components/Input';
import Trace from 'app/components/Trace';

import styles from './styles.module.scss';
import { defaultState } from 'redux/traceExpression/reducer';

class AppContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expression: '',
      newExpression: '',
      idCurrentExpresion: 0,
      selectedTraceExpressionId: null
    };
  }

  handleClickTrace = expressionId => {
    this.setState(() => ({
      selectedTraceExpressionId: expressionId
    }));
  };

  handleClickNewExpression = value => {
    switch (value) {
      case '+':
      case '-':
      case '*':
      case '/':
      case '=':
        this.setState(prevState => ({
          newExpression: prevState.newExpression.concat(value)
        }));
        break;
      case 'delete':
        this.setState(prevState => ({
          newExpression: prevState.newExpression.toString().slice(0, -1)
        }));
        break;
      case 'c':
        this.setState(prevState => ({
          newExpression: ''
        }));
        break;

      default:
        if (isFinite(value)) {
          this.setState(prevState => ({
            newExpression: prevState.newExpression.concat(value)
          }));
        }
    }
  };

  handleClick = value => {
    switch (value) {
      case '+':
      case '-':
      case '*':
      case '/':
        this.setState(prevState => {
          return {
            expression: prevState.expression.concat(value)
          };
        });
        break;
      case '=':
        this.setState(prevState => {
          if (isFinite(prevState.expression.slice(-1))) {
            const resultado = eval(prevState.expression);
            const resultadoToString = resultado.toString();
            return { expression: resultadoToString };
          }
        });
        break;
      case 'delete':
        this.setState(prevState => ({
          expression: prevState.expression.toString().slice(0, -1)
        }));
        break;
      case 'C':
        this.setState(() => ({
          expression: ''
        }));
        break;
      case 'save':
        {
          const formatExpression = this.state.expression;
          // this.props.dispatch(traceExpressionActions.cleanSaveExpression());
          this.props.dispatch(
            traceExpressionActions.saveExpressionAction({
              id: this.state.idCurrentExpresion,
              expression: formatExpression
            })
          );
          this.setState(prevState => ({
            idCurrentExpresion: prevState.idCurrentExpresion + 1
          }));
        }
        break;
      case 'deleteAllTrace':
        const formatTrace = this.state;
        //this.props.dispatch(deleteAllExpressionAction(this.state));
        this.props.dispatch(
          traceExpressionActions.deleteAllAction({
            expression: ''
          })
        );
        break;
      case 'deleteSomeTrace':
        {
          const formatId = this.state.selectedTraceExpressionId;
          //this.props.dispatch(deleteSomeExpressionAction(this.state.selectedTraceExpressionId));
          this.props.dispatch(
            traceExpressionActions.deleteSomeExpressionAction({
              id: formatId
            })
          );
        }
        break;
      case 'editExpression':
        //return this.props.dispatch(
        //  editExpressionAction(this.state.selectedTraceExpressionId, this.state.newExpression)
        //);
        const formatNewExpression = this.state.newExpression;
        this.props.dispatch(
          traceExpressionActions.changeExpressionAction({
            id: this.state.selectedTraceExpressionId,
            expression: formatNewExpression
          })
        );
        break;
      default:
        if (isFinite(value)) {
          this.setState(prevState => ({
            expression: prevState.expression.concat(value)
          }));
        }
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.containerTrace}>
          <Trace
            value={this.state.newExpression}
            handleClickNewExpression={this.handleClickNewExpression}
            handleClickTrace={this.handleClickTrace}
          />
        </div>
        <div className={styles.containerCalculator}>
          <div className={styles.input}>
            <Input value={this.state.expression} handleClick={this.handleClick} />
          </div>
          <div className={styles.buttons}>
            <ButonsConfig handleClick={this.handleClick} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(AppContainer);
