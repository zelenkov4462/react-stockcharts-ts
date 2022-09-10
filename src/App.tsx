import React, { useEffect } from "react";
import "./App.css";
import axios from "axios";
import DataProvider from "./Context/GetData/DataContext";
import SimulationProvider from "./Context/SimulationNameAndValue/SimulationContext";
import InputSimulationData from "./components/InputSimulationData/InputSimulationDta";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <>
      <DataProvider>
        <SimulationProvider>
          <InputSimulationData />
          <HomePage />
        </SimulationProvider>
      </DataProvider>
    </>
  );
}

export default App;
