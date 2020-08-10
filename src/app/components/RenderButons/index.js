import React, { PureComponent } from 'react';

import Button from '../Buton';

import { BUTTONS_CONFIG } from './constants';
import styles from './style.module.scss';

class ButonsConfig extends PureComponent {
  setButtonValues = () =>
    BUTTONS_CONFIG.map(i => (
      <Button className={i.className} value={i.value} handleClick={this.props.handleClick} text={i.text} />
    ));

  render() {
    return this.setButtonValues();
  }
}

export default ButonsConfig;
