import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ButonsConfig from 'app/components/RenderButons';
import Input from 'app/components/Input';

import styles from './styles.module.scss';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expression: '',
      operacion: '',
      firstExpression: ''
    };
  }

  handleClick = value => {
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
                firstExpression: this.firstExpression + ' ' + value + ' ' + this.state.expression
              };
              break;

            default:
              return {
                firstExpression: prevState.expression,
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
                firstExpression: ''
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

export default Home;
