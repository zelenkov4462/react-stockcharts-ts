import React, { FC } from "react";
import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";
import { IDataChart, IDataContext, IDataSim, IStatistics } from "./types";

const DataContext = createContext<IDataContext>({
  options: null,
  setOptions: () => {},
  selectedOption: null,
  setSelectedOption: () => {},
  dataSim: {
    nameSim: null,
    valueSim: null,
    valueTimeFrame: null,
  },
  setDataSim: () => {},
  error: false,
  statistics: null,
});

export const useData = () => {
  return useContext(DataContext);
};

interface Props {
  children?: React.ReactNode;
}

const DataProvider: FC<Props> = ({ children }) => {
  const [options, setOptions] = useState<IDataChart[] | null>(null);
  const [selectedOption, setSelectedOption] = useState<IDataChart | null>(null);
  const [dataSim, setDataSim] = useState<IDataSim>({
    nameSim: null,
    valueSim: null,
    valueTimeFrame: null,
  });
  const [error, setError] = useState<boolean>(false);
  const [statistics, setStatistics] = useState<IStatistics | null>(null);

  const { valueTimeFrame } = dataSim;

  useEffect(() => {
    const { nameSim, valueSim, valueTimeFrame } = dataSim;
    const getOptions = async () => {
      try {
        setError(false);
        const responseOptions = await axios.get(
          `http://159.223.232.224:8084/simulation/${nameSim}_${valueSim}?graph=${valueTimeFrame}`
        );
        if (responseOptions.status === 200) {
          const options = responseOptions.data.data;
          setOptions(options);
          setSelectedOption(options[0]);
          setError(false);
          console.log(options);
          console.log(selectedOption);
        } else {
          throw "Некорректная симуляция";
        }
      } catch (e) {
        setError(true);
        setOptions(null);
        setSelectedOption(null);
        console.log(error);
      }
    };
    getOptions();
    const getStatistics = async () => {
      try {
        setError(false);
        const responseOptions = await axios.get(
          `http://159.223.232.224:8084/statistics/${nameSim}_${valueSim}`
        );
        if (responseOptions.status === 200) {
          const statisticsData = responseOptions.data;
          setStatistics(statisticsData);
          setError(false);
        } else {
          throw "Ошибка";
        }
      } catch (e) {
        setError(true);
      }
    };
    getStatistics();
  }, [dataSim]);

  return (
    <DataContext.Provider
      value={{
        options,
        setOptions,
        selectedOption,
        setSelectedOption,
        dataSim,
        setDataSim,
        error,
        statistics,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
