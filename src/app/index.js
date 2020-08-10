import React, { PureComponent } from 'react';

import ButonsConfig from 'app/components/RenderButons';
import Input from 'app/components/Input';

import styles from './styles.module.scss';

class AppContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { expresion: '', operacion: '', primerExpresion: 0 };
  }

  handleClick = value => {
    switch (value) {
      case '+':
      case '-':
      case '*':
      case '/':
        this.setState(prevState => {
          const primerValor = parseInt(prevState.primerExpresion);
          const segundoValor = parseInt(prevState.expresion);
          let resultado = '';
          switch (prevState.operacion) {
            case '+':
              resultado = primerValor + segundoValor;
              return { expresion: resultado, operacion: '' };
              break;
            case '-':
              resultado = primerValor - segundoValor;
              return { expresion: resultado, operacion: '' };
              break;
            case '*':
              resultado = primerValor * segundoValor;
              return { expresion: resultado, operacion: '' };
              break;
            case '/':
              resultado = primerValor / segundoValor;
              return { expresion: resultado, operacion: '' };
              break;
            default:
              return {
                primerExpresion: prevState.expresion,
                operacion: value,
                expresion: ''
              };
          }
        });
        break;
      case '=':
        this.setState(prevState => {
          const primerValor = parseInt(prevState.primerExpresion);
          const segundoValor = parseInt(prevState.expresion);
          let resultado = '';
          switch (prevState.operacion) {
            case '+':
              resultado = primerValor + segundoValor;
              return { expresion: resultado, operacion: '' };
              break;
            case '-':
              resultado = primerValor - segundoValor;
              return { expresion: resultado, operacion: '' };
              break;
            case '*':
              resultado = primerValor * segundoValor;
              return { expresion: resultado, operacion: '' };
              break;
            case '/':
              resultado = primerValor / segundoValor;
              return { expresion: resultado, operacion: '' };
              break;
          }
        });
        break;
      case 'delete':
        this.setState(prevState => ({
          expresion: prevState.expresion.toString().slice(0, -1)
        }));
        break;
      case 'C':
        this.setState(() => ({
          expresion: '',
          operacion: '',
          primerExpresion: 0
        }));
        break;
      default:
        if (isFinite(value)) {
          this.setState(prevState => ({ expresion: prevState.expresion + value }));
        }
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.input}>
          <Input value={this.state.expresion} handleClick={this.handleClick} />
        </div>
        <div className={styles.buttons}>
          <ButonsConfig handleClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

export default AppContainer;
