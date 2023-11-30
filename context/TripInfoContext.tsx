import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

interface TripInfoContextProps {
  selectedTripInfo: { tripID: null | number; bookingType: null | string };
  showForm: boolean;
  handleClearTripInfo: () => void;
  setSelectedTripInfo: ({ tripID, bookingType }) => void;
  setShowForm: (boolean) => void;
}

const TripInfoContext = createContext<
  TripInfoContextProps | undefined
>(undefined);

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

  const [showForm, setShowForm] = useState(false);

  const handleClearTripInfo = () => {
    setSelectedTripInfo({ tripID: null, bookingType: null });
    setShowForm(false);
  };

  return (
    <TripInfoContext.Provider
      value={{ selectedTripInfo, showForm, handleClearTripInfo, setSelectedTripInfo, setShowForm }}
    >
      {children}
    </TripInfoContext.Provider>
  );
};

export const useTripInfoContext = (): TripInfoContextProps => {
  const context = useContext(TripInfoContext);
  if (!context) {
    throw new Error(
      "useTripInfoContext must be used within a TripInfoProvider"
    );
  }
  return context;
};
