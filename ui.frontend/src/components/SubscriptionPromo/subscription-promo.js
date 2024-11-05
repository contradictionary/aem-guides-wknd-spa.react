import React, { useState } from "react";
require("./subscription-promo.css");

const SubscriptionPromo = ({
  title,
  description,
  emailLabel,
  emailMandatoryError,
  emailInvalidError,
  pdfPath,
  pdfthumb,
  ctaText,
}) => {
  const [email, setEmail] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    company: "",
    consent1: false,
    consent2: false,
  });
  const [errors, setErrors] = useState({});

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: "" }));
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleEmailSubmit = () => {
    if (!isValidEmail(email)) {
      setErrors((prev) => ({ ...prev, email: emailInvalidError }));
      return;
    }
    setFormVisible(true);
  };

  const handleFormSubmit = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.consent1 && !formData.consent2)
      newErrors.consent = "At least one consent is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Form submitted", formData);
    window.open(pdfPath, "_blank");
  };

  return (
    <div className="cmp-subscription-promo" data-theme="light">
      {!formVisible ? (
        <div className="cmp-subscription-promo__initial-view">
          <h2>{title}</h2>
          <p>{description}</p>
          <input
            type="email"
            placeholder={emailLabel}
            value={email}
            onChange={handleEmailChange}
            aria-label={emailLabel}
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <button onClick={handleEmailSubmit} disabled={!isValidEmail(email)}>
            {ctaText}
          </button>
        </div>
      ) : (
        <div className="cmp-subscription-promo__form">
          <h2>You're almost done!</h2>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleFormChange}
            aria-label="First name"
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleFormChange}
            aria-label="Last name"
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
          <input
            type="text"
            name="country"
            placeholder="Country/Location"
            value={formData.country}
            onChange={handleFormChange}
            aria-label="Country/Location"
          />
          {errors.country && <span className="error">{errors.country}</span>}
          <input
            type="text"
            name="company"
            placeholder="Company (Optional)"
            value={formData.company}
            onChange={handleFormChange}
            aria-label="Company"
          />
          <label>
            <input
              type="checkbox"
              name="consent1"
              checked={formData.consent1}
              onChange={handleFormChange}
            />
            By checking this box you consent to KPMG sending you insights, event
            invitations and other benefits via email.
          </label>
          <label>
            <input
              type="checkbox"
              name="consent2"
              checked={formData.consent2}
              onChange={handleFormChange}
            />
            By checking this box you consent to KPMG sending you insights, event
            invitations and other benefits via email.
          </label>
          {errors.consent && <span className="error">{errors.consent}</span>}
          <div className="privacy-notice">
            You will receive an email after registration to activate your
            account and set up your preferences for content personalization,
            additional subscriptions, opting out of email communications and
            deleting your account any time after registration. Your information
            will be processed in accordance with our Privacy Notice.
          </div>
          <button
            onClick={handleFormSubmit}
            disabled={
              !formData.firstName ||
              !formData.lastName ||
              !formData.country ||
              (!formData.consent1 && !formData.consent2)
            }
          >
            Subscribe
          </button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPromo;
