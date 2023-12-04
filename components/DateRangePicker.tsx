import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangePickerProps {
  placeholderTextStart: string;
  placeholderTextEnd: string;
  startDate: Date | null;
  endDate: Date | null;
  onChange: (date: Date | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  placeholderTextStart,
  placeholderTextEnd,
  startDate,
  endDate,
  onChange,
}) => {
  return (
    <div className="flex items-center">
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => onChange(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText={placeholderTextStart}
        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
      <span className="mx-4 text-gray-500">to</span>
      <DatePicker
        selected={endDate}
        onChange={(date: Date | null) => onChange(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText={placeholderTextEnd}
        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
    </div>
  );
};

export default DateRangePicker;
