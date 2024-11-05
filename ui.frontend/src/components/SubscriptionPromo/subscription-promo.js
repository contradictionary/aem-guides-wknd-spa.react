import React, { useState } from "react";
import "./subscription-promo.css";

const SubscriptionPromo = ({
  title,
  description,
  emailLabel,
  emailMandatoryError,
  emailInvalidError,
  pdfPath,
  pdfThumbnail,
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
  const [subscribed, setSubscribed] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = () => {
    if (!email) {
      setErrors({ email: emailMandatoryError });
    } else if (!validateEmail(email)) {
      setErrors({ email: emailInvalidError });
    } else {
      setErrors({});
      setFormVisible(true);
    }
  };

  const handleFormSubmit = () => {
    const { firstName, lastName, country } = formData;
    if (firstName && lastName && country) {
      setSubscribed(true);
      window.open(pdfPath, "_blank");
    } else {
      setErrors({ form: "Please fill out all required fields." });
    }
  };

  return (
    <div className="cmp-subscription-promo">
      {!formVisible && !subscribed && (
        <div className="cmp-subscription-promo__email">
          <div style={{display:'flex',gap:'1rem'}}>
            <img
              src={pdfThumbnail}
              alt="PDF Thumbnail"
              className="pdf-thumbnail"
            />
            <h2>{title}</h2>
          </div>
          <p>{description}</p>
          <input
            type="email"
            placeholder={emailLabel}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-required="true"
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <button onClick={handleEmailSubmit}>{ctaText}</button>
          <p className="privacy-link">View our Privacy</p>
        </div>
      )}
      {formVisible && !subscribed && (
        <div className="cmp-subscription-promo__form">
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            aria-required="true"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            aria-required="true"
          />
          <input
            type="text"
            placeholder="Country/Location"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
            aria-required="true"
          />
          <input
            type="text"
            placeholder="Company (Optional)"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
          />
          <label>
            <input
              type="checkbox"
              checked={formData.consent1}
              onChange={(e) =>
                setFormData({ ...formData, consent1: e.target.checked })
              }
            />
            Consent to receive insights
          </label>
          <label>
            <input
              type="checkbox"
              checked={formData.consent2}
              onChange={(e) =>
                setFormData({ ...formData, consent2: e.target.checked })
              }
            />
            Consent to receive event invitations
          </label>
          {errors.form && <span className="error">{errors.form}</span>}
          <button onClick={handleFormSubmit}>Subscribe</button>
        </div>
      )}
      {subscribed && (
        <div className="cmp-subscription-promo__success">
          <p>Thank you for subscribing! Your PDF is now available.</p>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPromo;
