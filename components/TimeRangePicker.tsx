import React, { useState } from 'react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

interface TimeRangePickerProps {
  onChange: (start: string, end: string) => void;
}

const TimeRangePicker: React.FC<TimeRangePickerProps> = ({ onChange }) => {
  const [startTime, setStartTime] = useState<string>('00:00');
  const [endTime, setEndTime] = useState<string>('00:00');

  const handleStartTimeChange = (time: string) => {
    setStartTime(time);
    onChange(time, endTime);
  };

  const handleEndTimeChange = (time: string) => {
    setEndTime(time);
    onChange(startTime, time);
  };

  return (
    <div className="flex items-center">
      <TimePicker
        value={startTime}
        onChange={(time) => handleStartTimeChange(time as string)}
        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
      />
      <span className="mx-4 text-gray-500">to</span>
      <TimePicker
        value={endTime}
        onChange={(time) => handleEndTimeChange(time as string)}
        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
      />
    </div>
  );
};

export default TimeRangePicker;
