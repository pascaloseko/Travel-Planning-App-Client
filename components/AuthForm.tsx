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
}

interface InputProps {
  label: string;
  type: string;
  name: string;
  minLength: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
}

const AuthInput: React.FC<InputProps> = ({
  label,
  type,
  name,
  minLength,
  value,
  onChange,
  required,
}) => (
  <>
    <label className="block mb-2" htmlFor={name}>
      {label}
    </label>
    <input
      className="w-full px-4 py-2 mb-4 border rounded-md"
      minLength={minLength}
      name={name}
      id={name}
      type={type}
      placeholder={label}
      value={value}
      onChange={onChange}
      required={required}
    />
  </>
);

const AuthLink: React.FC<{ href: string; text: string; title: string }> = ({ href, text, title }) => (
    <p className="mt-4 text-center">
      {text}{" "}
      <Link href={href} className="text-blue-500">
        {title} here
      </Link>
    </p>
  );
  

const AuthForm: React.FC<AuthFormProps> = ({ title, onSubmit, onSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await onSubmit(formData);

      // Call the onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(`${title} error:`, error);
    }
  };

  return (
    <div className="max-w-md mx-auto m-4 p-6 bg-white border rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <form onSubmit={handleSubmit}>
        <AuthInput
          label="Email"
          type="text"
          name="email"
          minLength={3}
          value={formData.email}
          onChange={handleChange}
          required
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
        />

        <button
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
          type="submit"
        >
          {title}
        </button>
      </form>

      {title === "Login" && <AuthLink href="/signup" text="Don't have an account?" title="Sign Up" />}
      {title === "Signup" && <AuthLink href="/login" text="Have an account?" title="Log In" />}
    </div>
  );
};

export default AuthForm;
