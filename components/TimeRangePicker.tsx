import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

interface TimeRangePickerProps {
  placeholderTextStart: string;
  placeholderTextEnd: string;
  selectedStartTime: Date | null;
  selectedEndTime: Date | null;
  onChangeStartTime: (date: Date | null) => void;
  onChangeEndTime: (date: Date | null) => void;
}

const TimeRangePicker: React.FC<TimeRangePickerProps> = ({
  placeholderTextStart,
  placeholderTextEnd,
  selectedStartTime,
  selectedEndTime,
  onChangeStartTime,
  onChangeEndTime,
}) => {
  return (
    <div className="flex items-center">
      <DatePicker
        selected={selectedStartTime}
        onChange={(date: Date | null) => onChangeStartTime(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        placeholderText={placeholderTextStart}
      />
      <span className="mx-4 text-gray-500">to</span>
      <DatePicker
        selected={selectedEndTime}
        onChange={(date: Date | null) => onChangeEndTime(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        placeholderText={placeholderTextEnd}
      />
    </div>
  );
};

export default TimeRangePicker;
