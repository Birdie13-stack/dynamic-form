import React, { useState, useEffect } from "react";
import './index.css';

function DynamicForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = (name, value) => {
    const validationErrors = { ...errors };

    switch (name) {
      case "name":
        if (value.length < 3) {
          validationErrors.name = "Name must be more than 3 characters";
        } else {
          delete validationErrors.name;
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          validationErrors.email = "Email is not valid";
        } else {
          delete validationErrors.email;
        }
        break;
      case "password":
        if (value.length < 8) {
          validationErrors.password = "Password must be more than 8 characters";
        } else if (!/\d/.test(value)) {
          validationErrors.password = "Password must contain a number";
        } else {
          delete validationErrors.password;
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          validationErrors.confirmPassword = "Passwords must match";
        } else {
          delete validationErrors.confirmPassword;
        }
        break;
      default:
        break;
    }

    setErrors(validationErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
  };

  useEffect(() => {
    setIsFormValid(Object.keys(errors).length === 0 &&
      formData.name.length >= 3 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.password.length >= 8 &&
      /\d/.test(formData.password) &&
      formData.confirmPassword === formData.password);
  }, [errors, formData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {
      // Format form data for display
      const dataString = `
        Name: ${formData.name}
        Email: ${formData.email}
        Password: ${formData.password}
        Confirm Password: ${formData.confirmPassword}
      `;

      alert(`Form Submitted Successfully!\n${dataString}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            onChange={handleChange}
            value={formData.name}
            className={errors.name ? 'error' : ''}
            autoComplete="off"
          />
          {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
            value={formData.email}
            className={errors.email ? 'error' : ''}
            autoComplete="off"
          />
          {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            placeholder="***********"
            required
            onChange={handleChange}
            value={formData.password}
            className={errors.password ? 'error' : ''}
            autoComplete="new-password"
          />
          {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <br />
          <input
            type="password"
            name="confirmPassword"
            placeholder="**********"
            required
            onChange={handleChange}
            value={formData.confirmPassword}
            className={errors.confirmPassword ? 'error' : ''}
            autoComplete="new-password"
          />
          {errors.confirmPassword && <p style={{color: 'red'}}>{errors.confirmPassword}</p>}
        </div>

        <button type="submit" disabled={!isFormValid}>Submit</button>
      </form>
    </div>
  );
}

export default DynamicForm;
