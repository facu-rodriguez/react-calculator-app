import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

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
      <form onSubmit={this.props.handleSubmit}>
        <div>
          <label>Name</label>
          <Field name="firstName" component="input" type="text" normalize={text} />
        </div>
        <div>
          <label>Review</label>
          <Field name="review" component="input" type="text" />
        </div>
        <div>
          <label>Phone Number</label>
          <Field name="phoneNumber" component="input" type="text" normalize={phoneNumber} />
        </div>
        {this.props.error && <strong>{this.props.error}</strong>}
        <button type="button" onClick={this.props.onClick}>
          <Link to="/">Cancel</Link>
        </button>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'review',
  destroyOnUnmount: false
})(ReviewForm);
