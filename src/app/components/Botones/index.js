import React, { PureComponent } from 'react';

import Button from '../Buton';
import styles from './style.module.scss';

const Calculadora = [
  { className: styles.borrarTodo, value: 'C', text: 'C' },
  { className: styles.borrar, value: 'borrar', text: '<-' },
  { className: styles.number, value: 7, text: 7 },
  { className: styles.number, value: 8, text: 8 },
  { className: styles.number, value: 9, text: 9 },
  { className: styles.operador, value: '+', text: '+' },
  { className: styles.number, value: 4, text: 4 },
  { className: styles.number, value: 5, text: 5 },
  { className: styles.number, value: 6, text: 6 },
  { className: styles.operador, value: '-', text: '-' },
  { className: styles.number, value: 1, text: 1 },
  { className: styles.number, value: 2, text: 2 },
  { className: styles.number, value: 3, text: 3 },
  { className: styles.operador, value: '*', text: 'x' },
  { className: styles.cero, value: 0, text: 0 },
  { className: styles.igual, value: '=', text: '=' },
  { className: styles.operador, value: '/', text: '%' }
];

class Botones extends PureComponent {
  setButtonValues = () =>
    Calculadora.map(i => (
      <Button className={i.className} value={i.value} handleClick={this.props.handleClick} text={i.text} />
    ));

  render() {
    console.log(this);
    return this.setButtonValues();
  }
}

export default Botones;
