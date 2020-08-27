import React, { PureComponent } from 'react';
import Form from 'app/components/Form';
import { Field, reduxForm } from 'redux-form';
import { SubmissionError } from 'redux-form';
import formService from 'services/formService';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

class ReviewForm extends PureComponent {
  handleSubmit = values => {
    return sleep(1000).then(() => {
      if (!values.firstName) {
        throw new SubmissionError({
          firstName: 'Name is empty',
          _error: 'Name field is Empty!'
        });
      } else if (!values.review) {
        throw new SubmissionError({
          review: 'Review is empty',
          _error: 'Review field is Empty!'
        });
      } else if (!values.phoneNumber) {
        throw new SubmissionError({
          phoneNumber: 'Phone number is empty',
          _error: 'Phone number field is Empty!'
        });
      } else {
        formService.postFormValues(values);
        window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
      }
    });
  };
  handleCancel = values => {
    if (values.firstName) {
      formService.postFormValues(values);
    }
  };

  render() {
    return <Form onClick={this.handleCancel} onSubmit={this.handleSubmit} />;
  }
}

export default ReviewForm;
