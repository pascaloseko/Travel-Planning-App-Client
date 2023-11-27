import React from "react";

interface TableProps {
  data: any[];
  columns: any[];
  loading: boolean;
}

const Table: React.FC<TableProps> = ({ data, columns, loading }) => {
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
                {column.render ? column.render(row) : row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
