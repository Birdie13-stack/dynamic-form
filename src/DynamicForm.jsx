import React, { useState } from "react";

function DynamicForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (formData.name.length < 3) {
      validationErrors.username = "Username must be more than 3 characters";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = "Email is not valid";
    }

    if (formData.password.length < 8) {
      validationErrors.password = "Password must be more than 8 characters";
    }

    if (!/\d/.test(formData.password)) {
      validationErrors.password = "Password must contain a number";
    }

    if (formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = "Passwords must match";
    }

    setErrors(validationErrors);

    if(Object.keys(validationErrors).length === 0) {
      alert("Form Submitted");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            onChange={handleChange}
          />

          {errors.username && <p style={{color: 'red'}}>{errors.username}</p>}
        </div>

        <div>
          <label htmlFor="">Email</label>
          <br />
          <input
            name="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
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
          />

          {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
        </div>

        <div>
          <label htmlFor="password">Confirm Password</label>
          <br />
          <input
            type="password"
            name="confirmpassword"
            placeholder="**********"
            required
            onChange={handleChange}
          />

          {errors.confirmPassword && <p style={{color: 'red'}}>{errors.confirmPassword}</p>}
        </div>

        <button type="submit" >Submit</button>
      </form>
    </div>
  );
}

export default DynamicForm;
