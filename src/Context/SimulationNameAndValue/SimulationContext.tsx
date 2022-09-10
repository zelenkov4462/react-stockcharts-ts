import React, { FC } from "react";
import { createContext, useContext, useState } from "react";
import { ISimulationContent } from "./types";

const SimulationContext = createContext<ISimulationContent>({
  nameSim: "",
  setNameSim: () => {},
  valueSim: "",
  setValueSim: () => {},
  valueTimeFrame: "",
  setValueTimeFrame: () => {},
});

interface Props {
  children?: React.ReactNode;
}

export const useSimulation = () => {
  return useContext(SimulationContext);
};
const SimulationProvider: FC<Props> = ({ children }) => {
  const [nameSim, setNameSim] = useState<string>("nearusdt");
  const [valueSim, setValueSim] = useState<string>("1662526924");
  const [valueTimeFrame, setValueTimeFrame] = useState<string>("WTF");

  return (
    <SimulationContext.Provider
      value={{
        nameSim,
        setNameSim,
        valueSim,
        setValueSim,
        valueTimeFrame,
        setValueTimeFrame,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export default SimulationProvider;
