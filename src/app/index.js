import React, { PureComponent } from 'react';

import Botones from 'app/components/Botones';
import Input from 'app/components/Input';

import styles from './styles.module.scss';

class AppContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { expresion: '', operacion: '', primerExpresion: 0 };
  }

  handleClick = value => {
    if (value === '+' || value === '-' || value === '*' || value === '/') {
      this.setState(prevState => ({
        primerExpresion: prevState.expresion,
        operacion: value,
        expresion: ''
      }));
    } else if (value === '=') {
      this.setState(prevState => {
        const primerValor = parseInt(prevState.primerExpresion);
        const segundoValor = parseInt(prevState.expresion);
        let resultado = '';
        if (prevState.operacion === '+') {
          resultado = primerValor + segundoValor;
          return { expresion: resultado, operacion: '' };
        }
        if (prevState.operacion === '-') {
          resultado = primerValor - segundoValor;
          return { expresion: resultado, operacion: '' };
        }
        if (prevState.operacion === '*') {
          resultado = primerValor * segundoValor;
          return { expresion: resultado, operacion: '' };
        }
        if (prevState.operacion === '/') {
          resultado = primerValor / segundoValor;
          return { expresion: resultado, operacion: '' };
        }
      });
    } else if (value === 'borrar' || value === 'C') {
      if (value === 'borrar') {
        this.setState(prevState => ({
          expresion: prevState.expresion.toString().slice(0, -1)
        }));
      } else {
        this.setState(() => ({
          expresion: '',
          operacion: '',
          primerExpresion: 0
        }));
      }
    } else {
      this.setState(prevState => ({ expresion: prevState.expresion + value }));
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.input}>
          <Input value={this.state.expresion} handleClick={this.handleClick} />
        </div>

        <br />
        <div className={styles.buttons}>
          <Botones handleClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

export default AppContainer;
