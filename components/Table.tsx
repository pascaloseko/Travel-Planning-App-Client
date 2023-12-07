import React from "react";
import {
  PaperAirplaneIcon,
  BuildingStorefrontIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import moment from "moment-timezone";

interface TableProps {
  data: any[];
  columns: any[];
  loading: boolean;
  onIconClick?: (tripId: number, bookingType: string) => void;
}

const Table: React.FC<TableProps> = ({ data, columns, loading, onIconClick }) => {
  if (loading) {
    // If data is loading, display a pulse loader
    return (
      <div className="animate-pulse">
        <div className="min-w-full bg-gray-200 h-8 mb-4"></div>
        <div className="min-w-full bg-gray-200 h-8 mb-4"></div>
        <div className="min-w-full bg-gray-200 h-8 mb-4"></div>
      </div>
    );
  }

  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((column, columnIndex) => (
            <th
              key={columnIndex}
              className="py-3.5 px-4 text-sm font-medium text-left text-gray-700"
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-300">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, columnIndex) => (
              <td
                key={columnIndex}
                className="px-4 py-4 text-sm whitespace-nowrap"
              >
                {column.render
                  ? column.render(row)
                  : renderColumnValue(column, row, onIconClick)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const renderColumnValue = (column, row, onIconClick) => {
  if (
    column.key === "hotel_booking" ||
    column.key === "flight_booking" ||
    column.key === "itinerary"
  ) {
    return renderBookingButtons(column.key, row, onIconClick);
  }

  if (column.key === "start_date" || column.key === "check_in_date" || column.key === "departure_date") {
    // Format date using moment.js
    return <span className="text-green-500">{formatDate(row[column.key])}</span>;
  } else if (column.key === "end_date" || column.key === "check_out_date" || column.key === "arrival_date") {
    return <span className="text-red-500">{formatDate(row[column.key])}</span>;
  }

  return row[column.key];
};

const renderBookingButtons = (bookingType, row, onIconClick) => {
  const handleIconClick = () => {
    onIconClick(row.id, bookingType);
  };

  return (
    <div
      className={`flex ${
        bookingType === "itinerary" ? `ml-3` : `ml-8`
      } cursor-pointer`}
    >
      {bookingType === "hotel_booking" ? (
        <BuildingStorefrontIcon
          className="w-5 h-5 text-green-500"
          onClick={handleIconClick}
        />
      ) : bookingType === "flight_booking" ? (
        <PaperAirplaneIcon
          className="w-5 h-5 text-blue-500"
          onClick={handleIconClick}
        />
      ) : bookingType === "itinerary" ? (
        <PencilSquareIcon
          className="w-5 h-5 text-red-500"
          onClick={handleIconClick}
        />
      ) : null}
    </div>
  );
};

const formatDate = (dateString: string) => {
  const dateFormats = ['YYYY-MM-DD', moment.ISO_8601];

  // Try parsing the date using different formats
  const parsedDate = moment(dateString, dateFormats, true);

  // Check if the date is valid
  if (parsedDate.isValid()) {
    // Return the formatted date
    return parsedDate.format('YYYY-MM-DD HH:mm:ss');
  }

  // Return the original string if parsing fails
  return dateString;
};

export default Table;
