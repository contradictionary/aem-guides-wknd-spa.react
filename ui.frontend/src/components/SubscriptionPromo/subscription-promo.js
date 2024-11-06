import React, { Component } from 'react';
import './subscription-promo.css';
import { MapTo } from '@adobe/aem-react-editable-components';

export const SubscriptionPromoConfig = {
  emptyLabel: 'Subscription Promo',

  isEmpty: function(props) {
    return !props || !props.title || props.title.trim().length < 1;
  }
};

export default class SubscriptionPromo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      formVisible: false,
      formData: {
        firstName: '',
        lastName: '',
        country: '',
        company: '',
        consent1: false,
        consent2: false,
      },
      errors: {},
      subscribed: false,
    };
  }

  validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleEmailSubmit = () => {
    const { email } = this.state;
    const { emailMandatoryError, emailInvalidError } = this.props;

    if (!email) {
      this.setState({ errors: { email: emailMandatoryError } });
    } else if (!this.validateEmail(email)) {
      this.setState({ errors: { email: emailInvalidError } });
    } else {
      this.setState({ errors: {}, formVisible: true });
    }
  };

  handleFormChange = (field, value) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [field]: value,
      },
    }));
  };

  handleFormSubmit = () => {
    const { firstName, lastName, country } = this.state.formData;
    const { pdfPath } = this.props;

    if (firstName && lastName && country) {
      this.setState({ subscribed: true });
      window.open(pdfPath, '_blank');
    } else {
      this.setState({ errors: { form: 'Please fill out all required fields.' } });
    }
  };

  render() {
    const {
      title,
      description,
      emailLabel,
      privacyLabel,
      privacyLink,
      registerCTA,
      pdfPath,
      pdfThumbnail="https://placehold.co/84x104?text=PDF%20Thumbnail",
      successCTA,
      loadingTitle,
      loadingDesc,
      overlayTitle,
      overlayDesc
    } = this.props;
    const { email, formVisible, formData, errors, subscribed } = this.state;

    return (
      <div className="cmp-subscription-promo">
        {!formVisible && !subscribed && (
          <div className="cmp-subscription-promo__email">
            <div style={{ display: 'flex', gap: '1rem' }}>
              <img
                src={pdfThumbnail}
                alt="PDF Thumbnail"
                className="pdf-thumbnail"
              />
              <div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </div>
            <input
              type="email"
              placeholder={emailLabel}
              value={email}
              onChange={this.handleEmailChange}
              aria-required="true"
            />
            {errors.email && <span className="error">{errors.email}</span>}
            <button onClick={this.handleEmailSubmit}>{registerCTA}</button>
            <p className="privacy-link">{privacyLabel} <a href={privacyLink}>View our Privacy</a></p>
          </div>
        )}
        {formVisible && !subscribed && (
          <div className="cmp-subscription-promo__form">
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => this.handleFormChange('firstName', e.target.value)}
              aria-required="true"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => this.handleFormChange('lastName', e.target.value)}
              aria-required="true"
            />
            <input
              type="text"
              placeholder="Country/Location"
              value={formData.country}
              onChange={(e) => this.handleFormChange('country', e.target.value)}
              aria-required="true"
            />
            <input
              type="text"
              placeholder="Company (Optional)"
              value={formData.company}
              onChange={(e) => this.handleFormChange('company', e.target.value)}
            />
            <label>
              <input
                type="checkbox"
                checked={formData.consent1}
                onChange={(e) => this.handleFormChange('consent1', e.target.checked)}
              />
              Consent to receive insights
            </label>
            <label>
              <input
                type="checkbox"
                checked={formData.consent2}
                onChange={(e) => this.handleFormChange('consent2', e.target.checked)}
              />
              Consent to receive event invitations
            </label>
            {errors.form && <span className="error">{errors.form}</span>}
            <button onClick={this.handleFormSubmit}>Subscribe</button>
          </div>
        )}
        {subscribed && (
          <div className="cmp-subscription-promo__success">
            <p>{overlayTitle}</p>
            <p>{overlayDesc}</p>
          </div>
        )}
      </div>
    );
  }
}

// Map the component to the AEM resource type
MapTo('wknd-spa-react/components/subscriptionpromo')(SubscriptionPromo, SubscriptionPromoConfig);
