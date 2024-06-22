import React, { useState } from 'react';
import { Form,  Button } from 'react-bootstrap';
import InscriptionHeader from "../InscriptionHeader/InscriptionHeader";
import Footer from "../HeaderAndFooter/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevValues => ({
      ...prevValues,
      [name]: value
    }));
    setErrors({ ...errors, [name]: "" });
}
const handleSubmit = (event) => {
  event.preventDefault();
  const newErrors = {};
  Object.keys(formData).forEach((key) => {
    if (
      !formData[key] && key !== "typeProj"
    ) { // Exclude "budget" from required fields check
      newErrors[key] = "Ce champ est requis";
    }
  });
  setErrors(newErrors);
  if (Object.keys(newErrors).length === 0) {
    console.log(formData)
    console.log("Successfully!");
    navigate("/inscription"); 
}
}


  return (
    <>
      <InscriptionHeader/>
      {/* <Row className="justify-content-md-center">
        <Col md={7}>
        <div className="features text-center pt-5 pb-5">
        <div className="container">
          <div className="main-title mt-5 mb-5 position-relative">
            <h2>Enoyer un message à l'admin</h2>
          </div>
        </div>
      </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                // required
              />
              {errors.firstName && (
                  <span className="error-message">{errors.firstName}</span>
                )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Prenom</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                // required
              />
              {errors.lastName && (
                  <span className="error-message">{errors.lastName}</span>
                )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                // required
              />
              {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter your message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                // required
              />
              {errors.message && (
                  <span className="error-message">{errors.message}</span>
                )}
            </Form.Group>
            <button
                  type="submit"
                  className="btn rounded-pill submit"
                  // onClick={handleUpload}
                  state={{ scroll: true }}
                >
                  Envoyer
                </button>
          </Form>
        </Col>
      </Row> */}
      <div className="features text-center pt-5 pb-5">
        <div className="container">
          <div className="main-title mt-5 mb-5 position-relative">
            <h2>Envoyer un message à l'admin</h2>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <form className="row g-3" onSubmit={handleSubmit}>

              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="formFirstName">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    // required
                  />
                  {errors.firstName && (
                    <span className="error-message">{errors.firstName}</span>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="formLastName">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    // required
                  />
                  {errors.lastName && (
                    <span className="error-message">{errors.lastName}</span>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-12">
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    // required
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-12">
                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter your message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    // required
                  />
                  {errors.message && (
                    <span className="error-message">{errors.message}</span>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-12">
                <button type="submit" className="btn rounded-pill submit">
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Contact;
