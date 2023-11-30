import Tabs from "./Tabs";

const Trip = ({
  selectedTripInfo,
  setSelectedTripInfo,
  setShowForm,
  showForm,
}) => {
  return (
    <div>
      <Tabs
        selectedTripInfo={selectedTripInfo}
        setSelectedTripInfo={setSelectedTripInfo}
        setShowForm={setShowForm}
        showForm={showForm}
      />
    </div>
  );
};

export default Trip;
