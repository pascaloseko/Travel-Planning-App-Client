import Tabs from "./Tabs";

const Trip = ({selectedTripInfo, setSelectedTripInfo}) => {
    return (
      <div>
        <Tabs selectedTripInfo={selectedTripInfo} setSelectedTripInfo={setSelectedTripInfo} />
      </div>
    );
  };
  
  export default Trip;