import React, { Component } from "react";
import { TypeChooser } from "react-stockcharts/lib/helper";
import Chart from "../Chart/Chart";
import { convertData } from "../../utils/utils";
import { IDataChart, IDataSim } from "../../Context/GetData/types";

interface Props {
  dataSim: IDataSim;
  stoksDataObj: IDataChart | null;
}

class MainChartWrap extends Component<Props> {
  render() {
    const { stoksDataObj, dataSim } = this.props;

    const { nameSim, valueSim } = dataSim;

    const timeFrame = stoksDataObj?.timeframe;

    if (stoksDataObj?.charts === null) {
      return <div>Data chart is empty. Please try again later.</div>;
    }
    if (stoksDataObj === null) {
      return <h1>Error! StockDataObj === null</h1>;
    }
    const stockData = convertData(stoksDataObj.charts);

    return (
      <div style={{ width: "100%" }}>
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          TimeFrame: {timeFrame}
        </h1>
        <h3 style={{ display: "flex", justifyContent: "center" }}>
          Symbol: {nameSim}
        </h3>
        <h4 style={{ display: "flex", justifyContent: "center" }}>
          idSimulation: {valueSim}
        </h4>
        <div style={{ padding: "0 20px" }}>
          <TypeChooser>
            {(type) => (
              <Chart type={type} data={stockData} timeFrame={timeFrame} />
            )}
          </TypeChooser>
        </div>
      </div>
    );
  }
}

export default MainChartWrap;
