import React, { PureComponent } from 'react';
import store from 'redux/store';
import {
  saveExpressionAction,
  deleteAllExpressionAction,
  deleteSomeExpressionAction,
  editExpressionAction
} from 'redux/traceExpression/actions';
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
      operacion: '',
      firstExpression: '',
      newExpression: '',
      idCurrentExpresion: 0,
      selectedTraceExpressionId: null
    };
  }

  selectedTraceIndex = 0;
  modifyExpression = 0;

  handleClickTrace = (expressionId, index, modifyExpression) => {
    this.setState(() => ({
      selectedTraceExpressionId: expressionId
    }));
    return (
      (this.selectedTraceIndex = index),
      (modifyExpression = this.state.newExpression)
    );
  };

  handleClick = value => {
    console.log(value);
    switch (value) {
      case '+':
      case '-':
      case '*':
      case '/':
        this.setState(prevState => {
          switch (prevState.operacion) {
            case '+':
            case '-':
            case '*':
            case '/':
              return {
                firstExpression: this.firstExpression + ' ' + value + ' ' + this.state.expression,
                newExpression: this.firstExpression
              };
              break;

            default:
              return {
                firstExpression: prevState.expression,
                newExpression: prevState.firstExpression,
                operacion: value,
                expression: ''
              };
          }
        });
        break;
      case '=':
        this.setState(prevState => {
          const primerValor = eval(prevState.firstExpression);
          const segundoValor = eval(prevState.expression);
          let resultado = '';
          switch (prevState.operacion) {
            case '+':
              resultado = primerValor + segundoValor;
              return {
                expression: resultado,
                operacion: '',
                firstExpression: '',
                newExpression: this.expression
              };
              break;
            case '-':
              resultado = primerValor - segundoValor;
              return { expression: resultado, operacion: '', firstExpression: '' };
              break;
            case '*':
              resultado = primerValor * segundoValor;
              return { expression: resultado, operacion: '', firstExpression: '' };
              break;
            case '/':
              resultado = primerValor / segundoValor;
              return { expression: resultado, operacion: '', firstExpression: '' };
              break;
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
          expression: '',
          operacion: '',
          firstExpression: ''
        }));
        break;
      case 'save':
        {
          const formatExpression =
            this.state.firstExpression + ' ' + this.state.operacion + ' ' + this.state.expression;
          this.props.dispatch(
            saveExpressionAction({ id: this.state.idCurrentExpresion, expression: formatExpression })
          );
          this.setState(prevState => ({
            idCurrentExpresion: prevState.idCurrentExpresion + 1
          }));
        }
        break;
      case 'deleteAllTrace':
        this.props.dispatch(deleteAllExpressionAction(this.state));
        break;
      case 'deleteSomeTrace':{
        console.log({state: this.state.selectedTraceExpressionId})
        this.props.dispatch(deleteSomeExpressionAction(this.state.selectedTraceExpressionId));
      }
        break;
      case 'editExpression':
        console.log(this.modifyExpression);
        return this.props.dispatch(editExpressionAction(this.selectedTraceIndex, this.modifyExpression));

        break;
      default:
        if (isFinite(value)) {
          this.setState(prevState => ({
            expression: prevState.expression + '' + value,
            newExpression: this.expression
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
            handleClick={this.handleClick}
            handleClickTrace={this.handleClickTrace}
          />
        </div>
        <div className={styles.containerCalculator}>
          <div className={styles.input}>
            <Input
              value={this.state.firstExpression + ' ' + this.state.operacion + ' ' + this.state.expression}
              handleClick={this.handleClick}
            />
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
