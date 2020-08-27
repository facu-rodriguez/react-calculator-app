import React, { PureComponent } from 'react';
import store from 'redux/store';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';

import traceExpressionActions from 'redux/traceExpression/actions';
import ButonsConfig from 'app/components/RenderButons';
import Input from 'app/components/Input';
import Trace from 'app/components/Trace';

import styles from './styles.module.scss';
import { defaultState } from 'redux/traceExpression/reducer';

class ScreenTrace extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expression: '',
      operacion: false,
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
          if (prevState.operacion === false) {
            return {
              expression: prevState.expression.concat(' ' + value + ' '),
              operacion: true
            };
          }
        });
        break;
      case '=':
        this.setState(prevState => {
          if (isFinite(prevState.expression.slice(-1)) && prevState.expression.slice(-1) !== ' ') {
            const resultado = eval(prevState.expression);
            const resultadoToString = resultado.toString();
            return { expression: resultadoToString };
          }
        });
        break;
      case 'delete':
        this.setState(prevState => {
          if (prevState.operacion === true) {
            return {
              expression: prevState.expression.toString().slice(0, -1),
              operacion: false
            };
          } else {
            expression: prevState.expression.toString().slice(0, -1);
          }
        });
        break;
      case 'C':
        this.setState(() => ({
          expression: ''
        }));
        break;
      case 'save':
        {
          const formatExpression = this.state.expression;
          let array = this.props.expression.traceExpression;
          let lastItem = array[array.length - 1];

          if (array.length > 0) {
            this.state.idCurrentExpresion = lastItem.id + 1;
          } else this.stateidCurrentExpresion = this.state.idCurrentExpresion;
          this.props.dispatch(
            traceExpressionActions.saveExpressionAction({
              id: this.state.idCurrentExpresion,
              expression: formatExpression
            })
          );
        }

        break;
      case 'deleteAllTrace':
        this.props.dispatch(traceExpressionActions.deleteAllAction(this.state));
        break;
      case 'deleteSomeTrace':
        {
          const formatId = this.state.selectedTraceExpressionId;
          this.props.dispatch(
            traceExpressionActions.deleteSomeExpressionAction({
              id: formatId
            })
          );
        }
        break;
      case 'editExpression':
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
            expression: prevState.expression.concat(value),
            operacion: false
          }));
        }
    }
  };
  render() {
    return (
      <div>
        <Link className={styles.link} to="/">
          Home
        </Link>
        <Link className={styles.link} to="/Form">
          Encuesta
        </Link>
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
      </div>
    );
  }
}

const mapStateToProps = store => ({
  expression: store.traceExpression
});

export default connect(mapStateToProps)(ScreenTrace);
