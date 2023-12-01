import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

interface TimePickerProps {
  label: string;
  selectedTime: Date | null;
  onChange: (date: Date | null) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ label, selectedTime, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <DatePicker
        selected={selectedTime}
        onChange={(date: Date | null) => onChange(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default TimePicker;
