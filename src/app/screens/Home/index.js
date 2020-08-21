import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store from 'redux/store';
import {
  saveExpressionAction,
  deleteAllExpressionAction,
  deleteSomeExpressionAction,
  editExpressionAction
} from 'redux/traceExpression/actions';

import ButonsConfig from 'app/components/RenderButons';
import Input from 'app/components/Input';

import styles from './styles.module.scss';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expression: '',
      operacion: false,
      idCurrentExpresion: 0
    };
  }
  handleClick = value => {
    switch (value) {
      case '+':
      case '-':
      case '*':
      case '/':
        this.setState(prevState => {
          if (prevState.operacion === false) {
            return {
              expression: prevState.expression.concat(value),
              operacion: true
            };
          }
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
            saveExpressionAction({ id: this.state.idCurrentExpresion, expression: formatExpression })
          );
        }

        break;
      case 'deleteAllTrace':
        this.props.dispatch(deleteAllExpressionAction(this.state));
        break;
      case 'deleteSomeTrace':
        {
          this.props.dispatch(deleteSomeExpressionAction(this.state.selectedTraceExpressionId));
        }
        break;
      case 'editExpression':
        return this.props.dispatch(
          editExpressionAction(this.state.selectedTraceExpressionId, this.state.newExpression)
        );
        break;
      default:
        if (isFinite(value)) {
          this.setState(prevState => ({
            expression: prevState.expression + '' + value
          }));
        }
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <Link className={styles.link} to="/Trace">
          Trace
        </Link>
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

const mapStateToProps = store => ({
  expression: store.traceExpression
});

export default connect(mapStateToProps)(Home);
