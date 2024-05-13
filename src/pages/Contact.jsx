import { useState } from "react";
import "../styles/Contact.scss";

import contactSvg from "../assets/svg/titleBanner/contact.svg";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    subject: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is requiered";
    }
    if (!formData.email.trim()) {
      errors.email = "Mail is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Mail is not valid";
    }
    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    }
    if (!formData.message.trim()) {
      errors.message = "A message is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setFormSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }
  };

  return (
    <div className="contact">
      <div className="section">
        <div className="trait trait-left"> </div>
        <img className="aboutus-svg" src={contactSvg} alt="contact.svg" />
        <div className="trait trait-right"> </div>
      </div>
      <div className="formulary">
        <form onSubmit={handleSubmit}>
          {formSubmitted && (
            <div className="alert alert-success" role="alert">
              Formulary sent successfully!
            </div>
          )}
          <div className="infoLabel">
            <label htmlFor="name">NAME</label>
            <input
              type="text"
              className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {formErrors.name && (
              <div className="invalid-feedback">{formErrors.name}</div>
            )}
          </div>
          <div className="infoLabel">
            <label htmlFor="email">MAIL</label>
            <input
              type="email"
              className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {formErrors.email && (
              <div className="invalid-feedback">{formErrors.email}</div>
            )}
          </div>
          <div className="infoLabel">
            <label htmlFor="subject">SUBJECT</label>
            <input
              type="text"
              className={`form-control ${
                formErrors.subject ? "is-invalid" : ""
              }`}
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
            />
            {formErrors.subject && (
              <div className="invalid-feedback">{formErrors.subject}</div>
            )}
          </div>
          <div className="infoLabel">
            <label htmlFor="message">MESSAGE</label>
            <textarea
              className={`form-control ${
                formErrors.message ? "is-invalid" : ""
              }`}
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
            />
            {formErrors.message && (
              <div className="invalid-feedback">{formErrors.message}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            SEND
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
