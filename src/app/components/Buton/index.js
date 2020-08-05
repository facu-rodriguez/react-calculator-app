import React, { PureComponent } from 'react';

import styles from './style.module.scss';

//componente por clase

class Button extends PureComponent {
  handleValueClick = () => {
    this.props.handleClick(this.props.value);
  };
  /* style = () => {
    let buttonNaN = { buttonNaN };
    let button = { button };
    if (this.props.value === NaN) {
      return buttonNaN;
    } else {
      return button;
    }
  };
  */

  render() {
    return (
      <button className={this.props.className} value={this.props.value} onClick={this.handleValueClick}>
        {this.props.text}
      </button>
    );
  }
}

export default Button;
