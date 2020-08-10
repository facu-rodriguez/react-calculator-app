import React, { PureComponent } from 'react';

import styles from './style.module.scss';

class Button extends PureComponent {
  handleValueClick = () => {
    this.props.handleClick(this.props.value);
  };

  render() {
    return (
      <button className={this.props.className} value={this.props.value} onClick={this.handleValueClick}>
        {this.props.text}
      </button>
    );
  }
}

export default Button;
