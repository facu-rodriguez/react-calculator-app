import React, { PureComponent } from 'react';

import styles from './style.module.scss';

class Input extends PureComponent {
  handleValuePress = e => {
    if (isFinite(e.key)) {
      this.props.handleClick(e.key);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
      this.props.handleClick(e.key);
    } else if (e.keyCode === 8 || e.key === 'C' || e.key === '=' || e.keyCode === 13) {
      if (e.keyCode == 8) {
        this.props.handleClick('borrar');
      } else if (e.keyCode === 13) {
        this.props.handleClick('=');
      } else {
        this.props.handleClick(e.key);
      }
    }
  };
  render() {
    console.log(this.props);
    return (
      <input
        className={styles.input}
        value={this.props.value}
        type="text"
        onKeyDown={this.handleValuePress}
      />
    );
  }
}

export default Input;
