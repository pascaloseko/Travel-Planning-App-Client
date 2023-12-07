import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

interface TripInfoContextProps<T> {
  selectedTripInfo: { tripID: null | number; bookingType: null | string };
  showForm: boolean;
  tripData: T[];
  bookingData: T[];
  setTripData: Dispatch<SetStateAction<T[]>>;
  setBookingData: Dispatch<SetStateAction<T[]>>;
  handleClearTripInfo: () => void;
  setSelectedTripInfo: ({
    tripID,
    bookingType,
  }: {
    tripID: null | number;
    bookingType: null | string;
  }) => void;
  setShowForm: (boolean: boolean) => void;
}

const TripInfoContext = createContext<TripInfoContextProps<any> | undefined>(
  undefined
);

interface TripInfoProviderProps {
  children: ReactNode;
}

export const TripInfoProvider: React.FC<TripInfoProviderProps> = ({
  children,
}) => {
  const [selectedTripInfo, setSelectedTripInfo] = useState({
    tripID: null,
    bookingType: null,
  });
  const [tripData, setTripData] = useState([]);
  const [bookingData, setBookingData] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const handleClearTripInfo = () => {
    setSelectedTripInfo({ tripID: null, bookingType: null });
    setShowForm(false);
  };

  return (
    <TripInfoContext.Provider
      value={{
        selectedTripInfo,
        showForm,
        tripData,
        bookingData,
        setTripData,
        setBookingData,
        handleClearTripInfo,
        setSelectedTripInfo,
        setShowForm,
      }}
    >
      {children}
    </TripInfoContext.Provider>
  );
};

export function useTripInfoContext<T>(): TripInfoContextProps<T> {
  const context = useContext<TripInfoContextProps<T>>(
    TripInfoContext as React.Context<TripInfoContextProps<T>>
  );
  if (!context) {
    throw new Error(
      "useTripInfoContext must be used within a TripInfoProvider"
    );
  }
  return context;
}
