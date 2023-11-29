import React, { useState } from "react";

interface InputFormProps {
  title: string;
  description: string;
  inputType: "text" | "email" | "date" | "time";
  onSave: (value: string | Date) => void;
}

const InputForm: React.FC<InputFormProps> = ({
  title,
  description,
  inputType,
  onSave,
}) => {
  const [inputValue, setInputValue] = useState<string | Date>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleDateTimeChange = (date: Date) => {
    setInputValue(date);
  };

  const handleSave = () => {
    onSave(inputValue);
  };

  return (
    <div className="bg-gray-100">
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-xl font-semibold mb-4">{title}</h1>
          <p className="text-gray-600 mb-6">{description}</p>
          <div className="mb-4">
            {inputType === "text" ? (
              <input
                type={inputType}
                placeholder={`Enter ${title.toLowerCase()}`}
                className={`w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500 ${inputType}-input`}
                value={inputValue as string}
                onChange={handleInputChange}
              />
            ) : inputType === "date" ? (
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500 date-input"
                value={inputValue as string}
                onChange={(e) => handleDateTimeChange(new Date(e.target.value))}
              />
            ) : inputType === "time" ? (
              <input
                type="time"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500 time-input"
                value={inputValue as string}
                onChange={(e) => handleDateTimeChange(new Date(`2000-01-01T${e.target.value}`))}
              />
            ) : null}
          </div>
          <button
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
