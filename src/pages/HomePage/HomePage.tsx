import React, { FC } from "react";
import { useData } from "../../Context/GetData/DataContext";
import MainChartWrap from "../../components/MainChartWrap/MainChartWrap";

interface Props {
  children?: React.ReactNode;
}

const HomePage: FC<Props> = () => {
  const {
    options,
    selectedOption,
    dataSim: { nameSim, valueSim },
    error,
    statistics,
  } = useData();

  if (!nameSim || !valueSim) {
    return (
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Введите данные
      </h1>
    );
  }
  if (error) {
    return (
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Неккоректные данные для симуляции. Введите заново
      </h1>
    );
  }

  if (!options) {
    return (
      <h1 style={{ display: "flex", justifyContent: "center" }}>Loading...</h1>
    );
  }
  if (!options.length) {
    return (
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Array DataCharts is empty. Please try again later.
      </h1>
    );
  }

  if (!statistics) {
    return null;
  }
  const {
    commission_sum,
    id,
    long_count,
    long_sum,
    loss_count,
    loss_sum,
    low_amount,
    prof_count,
    prof_sum,
    profit_factor,
    result,
    short_count,
    short_sum,
    symbol,
    total_sum,
  } = statistics;
  return (
    <div>
      <div
        style={{
          marginLeft: "10px",
          display: "flex",
          justifyContent: "center",
          marginTop: "15px",
        }}
      >
        <div style={{ marginRight: "50px" }}>
          <div>
            <strong>commission_sum</strong> : {commission_sum}
          </div>
          <div>
            <strong>id</strong> : {id}
          </div>
          <div>
            <strong>long_count</strong> : ${long_count}
          </div>
          <div>
            <strong>long_sum</strong> : {long_sum}
          </div>
        </div>
        <div style={{ marginRight: "50px" }}>
          <div>
            <strong>loss_count</strong> : {loss_count}
          </div>
          <div>
            <strong>loss_sum</strong> : {loss_sum}
          </div>
          <div>
            <strong>low_amount</strong> : {low_amount}
          </div>
          <div>
            <strong>prof_count</strong> : {prof_count}
          </div>
        </div>
        <div style={{ marginRight: "50px" }}>
          <div>
            <strong>prof_sum</strong> : {prof_sum}
          </div>
          <div>
            <strong>profit_factor</strong> : {profit_factor}
          </div>
          <div>
            <strong>result</strong> : {result}
          </div>
          <div>
            <strong>short_count</strong> : {short_count}
          </div>
        </div>
        <div style={{ marginRight: "50px" }}>
          <div>
            <strong>short_sum</strong> : {short_sum}
          </div>
          <div>
            <strong>symbol</strong> : {symbol}
          </div>
          <div>
            <strong>total_sum</strong> : {total_sum}
          </div>
        </div>
      </div>
      <MainChartWrap
        dataSim={{ nameSim, valueSim }}
        stoksDataObj={selectedOption}
      />
    </div>
  );
};

export default HomePage;
