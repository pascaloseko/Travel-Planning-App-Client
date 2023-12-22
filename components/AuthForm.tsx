import React, { useState } from "react";
import Link from "next/link";

interface AuthFormProps {
  title: string;
  onSubmit: (formData: {
    username?: string;
    password: string;
    email?: string;
  }) => Promise<void>;
  onSuccess?: () => void;
  loginError?: string;
}

interface InputProps {
  label: string;
  type: string;
  name: string;
  minLength: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
  error?: string;
}

const AuthInput: React.FC<InputProps> = ({
  label,
  type,
  name,
  minLength,
  value,
  onChange,
  required,
  error,
}) => (
  <>
    <label className="block mb-2" htmlFor={name}>
      {label}
    </label>
    <input
      className={`w-full px-4 py-2 mb-4 border rounded-md ${
        error ? "border-red-500" : ""
      }`}
      minLength={minLength}
      name={name}
      id={name}
      type={type}
      placeholder={label}
      value={value}
      onChange={onChange}
      required={required}
    />
    {error && <p className="text-red-500">{error}</p>}
  </>
);

const AuthLink: React.FC<{ href: string; text: string; title: string }> = ({
  href,
  text,
  title,
}) => (
  <p className="mt-4 text-center">
    {text}{" "}
    <Link href={href} className="text-blue-500">
      {title} here
    </Link>
  </p>
);

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  onSubmit,
  onSuccess,
  loginError,
}) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
  }>({});

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear the associated error when the user starts typing
    setFormErrors({
      ...formErrors,
      [e.target.name]: "",
    });
    setSubmitError(null);
  };

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};
    const { email, password, username } = formData;

    if (!email || !email.trim()) {
      errors.email = "Email is required";
    }

    if (!password || !password.trim()) {
      errors.password = "Password is required";
    }

    if (title === "Signup" && (!username || !username.trim())) {
      errors.username = "Username is required";
    }

    setFormErrors(errors);

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formErrors, loginError);

    if (validateForm()) {
      try {
        await onSubmit(formData);

        // Call the onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        console.error(`${title} error:`, error);

        // Display error message to the user
        setSubmitError(
          "There was an issue submitting the form. Please try again later."
        );
        setFormErrors(null);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto m-4 p-6 bg-white border rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {submitError && <p className="text-red-500">{submitError}</p>}
      <form onSubmit={handleSubmit}>
        <AuthInput
          label="Email"
          type="text"
          name="email"
          minLength={3}
          value={formData.email}
          onChange={handleChange}
          required
          error={formErrors.email}
        />

        {title === "Signup" && (
          <AuthInput
            label="Username"
            type="text"
            name="username"
            minLength={3}
            value={formData.username}
            onChange={handleChange}
            required
            error={formErrors.username}
          />
        )}

        <AuthInput
          label="Password"
          type="password"
          name="password"
          minLength={5}
          value={formData.password}
          onChange={handleChange}
          required
          error={formErrors.password}
        />

        <button
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
          type="submit"
        >
          {title}
        </button>
        {loginError && <p className="ml-10 mt-2 text-red-500">{loginError}</p>}
      </form>

      {title === "Login" && (
        <AuthLink
          href="/signup"
          text="Don't have an account?"
          title="Sign Up"
        />
      )}
      {title === "Signup" && (
        <AuthLink href="/login" text="Have an account?" title="Log In" />
      )}
    </div>
  );
};

export default AuthForm;
