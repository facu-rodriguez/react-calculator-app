import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import styles from './style.module.scss';

const text = (value, previousValue) => {
  if (value.slice(-1).match(/[^\d]/g)) {
    return value;
  } else if (!value) {
    return value;
  } else return previousValue;
};

const phoneNumber = value => {
  if (!value) {
    return value;
  }

  const onlyNums = value.replace(/[^\d]/g, '');
  if (onlyNums.length <= 2) {
    return onlyNums;
  }
  if (onlyNums.length <= 6) {
    return `${onlyNums.slice(0, 2)} - ${onlyNums.slice(2)}`;
  }
  return `${onlyNums.slice(0, 2)} - ${onlyNums.slice(2, 6)}-${onlyNums.slice(6, 10)}`;
};

class ReviewForm extends PureComponent {
  render() {
    return (
      <form className={styles.form} onSubmit={this.props.handleSubmit}>
        <h1 className={styles.tittle}>Leave your comments here!</h1>
        <div className={styles.formContainer}>
          <div className={styles.fieldContainer}>
            <div>
              <label className={styles.label}>Name</label>
              <br></br>
              <Field
                className={styles.fields}
                name="firstName"
                component="input"
                type="text"
                normalize={text}
              />
            </div>
            <div>
              <label className={styles.label}>Review</label>
              <br></br>
              <Field className={styles.fields} name="review" component="input" type="text" />
            </div>
            <div>
              <label className={styles.label}>Phone Number</label>
              <br></br>
              <Field
                className={styles.fields}
                name="phoneNumber"
                component="input"
                type="text"
                normalize={phoneNumber}
              />
            </div>
            {this.props.error && <strong>{this.props.error}</strong>}
          </div>
          <div className={styles.buttonsContainer}>
            <button className={styles.buttonCancel} type="button" onClick={this.props.onClick}>
              <Link to="/">Cancel</Link>
            </button>
            <button className={styles.buttonSubmit} type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'review',
  destroyOnUnmount: false
})(ReviewForm);
