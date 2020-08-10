import React, { PureComponent } from 'react';

import styles from './style.module.scss';

class Input extends PureComponent {
  handleValuePress = e => {
    switch (e.keyCode) {
      case 8:
        this.props.handleClick('delete');
        break;
      case 13:
        this.props.handleClick('=');
        break;
      default:
        this.props.handleClick(e.key);
        break;
    }
  };

  render() {
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
