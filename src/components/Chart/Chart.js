import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import { BarSeries, CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
import algo from "react-stockcharts/lib/algorithm";

import { timeFormat } from "d3-time-format";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";
import LineSeries from "react-stockcharts/lib/series/LineSeries";
import MyOHLCTooltip from "../CustomOHLCTooltip/CustomOHLCTooltip";
import {
  LabelAnnotation,
  Label,
  Annotate,
  SvgPathAnnotation,
  buyPath,
  sellPath,
} from "react-stockcharts/lib/annotation";
import AreaSeries from "react-stockcharts/lib/series/AreaSeries";
import { ema } from "react-stockcharts/lib/indicator";
import { scaleTime } from "d3-scale";
import {
  AlternatingFillAreaSeries,
  StraightLine,
} from "react-stockcharts/lib/series";
import { saveInteractiveNodes, getInteractiveNodes } from "./interactiveUtils";
import TrendLine from "react-stockcharts/lib/interactive/TrendLine";
import { toObject } from "react-stockcharts/lib/utils";

class MyChart extends React.Component {
  render() {
    const height = 1050;
    const { type, data: initialData, width, ratio } = this.props;

    const { stockItems } = initialData;

    // const { timeFrame } = this.props;

    const margin = { left: 70, right: 70, top: 20, bottom: 30 };

    const gridHeight = height - margin.top - margin.bottom;
    const gridWidth = width - margin.left - margin.right;

    const showGrid = true;
    const yGrid = showGrid
      ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.2 }
      : {};
    const xGrid = showGrid
      ? { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.2 }
      : {};

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      (stockItems) => stockItems.time
    );

    const { data, xScale, xAccessor, displayXAccessor } =
      xScaleProvider(stockItems);

    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 100)]);
    const xExtents = [start, end];

    const defaultAnnotationProps = {
      // fontFamily: "Glyphicons Halflings",
      // fontSize: 20,
      // opacity: 0.8,
      // onClick: console.log.bind(console),
    };

    const longInAnnotationProps = {
      ...defaultAnnotationProps,
      y: ({ yScale, datum }) => yScale(datum.price),
      fill: "#006517",
      path: buyPath,
      tooltip: "Long In",
    };

    const longOutAnnotationProps = {
      ...defaultAnnotationProps,
      y: ({ yScale, datum }) => yScale(datum.price),
      fill: "#006517",
      path: sellPath,
      tooltip: "Long Out",
    };

    const shortInAnnotationProps = {
      ...defaultAnnotationProps,
      y: ({ yScale, datum }) => yScale(datum.price),
      fill: "#FF0000",
      path: sellPath,
      tooltip: "Short In",
    };

    const shortOutAnnotationProps = {
      ...defaultAnnotationProps,
      y: ({ yScale, datum }) => yScale(datum.price),
      fill: "#FF0000",
      path: buyPath,
      tooltip: "Short Out",
    };

    const tpDotAnnotationProps = {
      ...defaultAnnotationProps,
      y: ({ yScale, datum }) => yScale(datum.price),
      fill: "#00008B",
      path: buyPath,
      text: "●",
      fontSize: "25px",
      tooltip: "Tp Dot",
    };

    const vuManSellAnnotationProps = {
      ...defaultAnnotationProps,
      y: ({ yScale, datum }) => yScale(datum.price),
      fill: "#FF0000",
      path: buyPath,
      text: "●",
      fontSize: "25px",
      tooltip: "Vu man sell",
    };

    const vuManBuyAnnotationProps = {
      ...defaultAnnotationProps,
      y: ({ yScale, datum }) => yScale(datum.price),
      fill: "#006400",
      path: buyPath,
      text: "●",
      fontSize: "25px",
      tooltip: "Vu man buy",
    };

    return (
      <ChartCanvas
        height={1200}
        ratio={ratio}
        width={width}
        margin={{ left: 80, right: 80, top: 80, bottom: 30 }}
        type={type}
        seriesName="MSFT"
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
      >
        {/*<Label*/}
        {/*  x={(width - margin.left - margin.right) / 2}*/}
        {/*  y={-10}*/}
        {/*  fontSize="30"*/}
        {/*  text={`TimeFrame: ${timeFrame}`}*/}
        {/*/>*/}
        <Chart
          id={1}
          height={400}
          yExtents={(stockItems) => {
            // console.log(stockItems);
            return stockItems.price;
          }}
        >
          <YAxis
            axisAt="right"
            orient="right"
            ticks={5}
            {...yGrid}
            inverted={true}
            tickStroke="#000"
          />
          <XAxis
            axisAt="bottom"
            orient="bottom"
            outerTickSize={0}
            stroke="#000"
            opacity={0.5}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
          />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            // displayFormat={timeFormat("%Y-%m-%d")}
            displayFormat={timeFormat("%Y-%m-%d %Hh:%Mm:%Ss")}
          />
          <LineSeries
            yAccessor={(stockItems) => stockItems.price}
            stroke="#000"
            strokeDasharray="Split"
            strokeWidth={1}
          />

          <Annotate
            with={SvgPathAnnotation}
            when={(stockItems) => stockItems.long_in}
            usingProps={longInAnnotationProps}
          />
          <Annotate
            with={SvgPathAnnotation}
            when={(stockItems) => stockItems.long_out}
            usingProps={longOutAnnotationProps}
          />
          <Annotate
            with={SvgPathAnnotation}
            when={(stockItems) => stockItems.short_in}
            usingProps={shortInAnnotationProps}
          />
          <Annotate
            with={SvgPathAnnotation}
            when={(stockItems) => stockItems.short_out}
            usingProps={shortOutAnnotationProps}
          />
          <Annotate
            with={LabelAnnotation}
            when={(stockItems) => stockItems.tp_dot}
            usingProps={tpDotAnnotationProps}
          />
          <Annotate
            with={LabelAnnotation}
            when={(stockItems) => stockItems.vu_man_sell}
            usingProps={vuManSellAnnotationProps}
          />
          <Annotate
            with={LabelAnnotation}
            when={(stockItems) => stockItems.vu_man_buy}
            usingProps={vuManBuyAnnotationProps}
          />

          <MyOHLCTooltip origin={[-78, -60]} />
        </Chart>
        <Chart
          id={2}
          origin={(w, h) => [0, 450]}
          height={150}
          yExtents={(stockItems) => [
            stockItems.rsi,
            stockItems.mas,
            stockItems.mal,
          ]}
        >
          <XAxis axisAt="bottom" orient="bottom" showTicks={false} />
          <YAxis
            axisAt="right"
            orient="right"
            tickFormat={format(".2s")}
            ticks={5}
            {...yGrid}
          />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d %Hh:%Mm:%Ss")}
            outerTickSize={0}
            stroke="#000"
            opacity={0.5}
          />

          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
            tickStroke="#000"
          />

          <LineSeries
            yAccessor={(stockItems) => stockItems.rsi}
            stroke="#008B8B"
            strokeDasharray="line"
          />
          <LineSeries
            yAccessor={(stockItems) => stockItems.mas}
            stroke="#8B008B"
            strokeDasharray="line"
          />
          <LineSeries
            yAccessor={(stockItems) => stockItems.mal}
            stroke="#FFFF00"
            strokeDasharray="line"
          />

          <MyOHLCTooltip origin={[-78, -20]} />
        </Chart>
        <Chart
          id={3}
          origin={(w, h) => [0, 650]}
          height={150}
          yExtents={(stockItems) => stockItems.mfi}
        >
          <XAxis axisAt="bottom" orient="bottom" showTicks={false} />
          <YAxis axisAt="right" orient="right" {...yGrid} ticks={5} />

          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d %Hh:%Mm:%Ss")}
            opacity={0.5}
          />

          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
          />
          {/*<LineSeries*/}
          {/*  yAccessor={(stockItems) => stockItems.mfi}*/}
          {/*  stroke="#008000"*/}
          {/*  strokeDasharray="Split"*/}
          {/*  strokeWidth={1}*/}
          {/*/>*/}
          <AlternatingFillAreaSeries
            baseAt={0}
            yAccessor={(stockItems) => stockItems.mfi}
          />
          <StraightLine yValue={0} />
          <MyOHLCTooltip origin={[-78, -10]} />
        </Chart>
        <Chart
          id={4}
          origin={(w, h) => [0, 850]}
          height={150}
          yExtents={(stockItems) => [stockItems.wt1, stockItems.wt2]}
        >
          <XAxis axisAt="bottom" orient="bottom" {...xGrid} />
          <YAxis
            axisAt="right"
            orient="right"
            ticks={5}
            tickFormat={format(".2s")}
            {...yGrid}
          />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d %Hh:%Mm:%Ss")}
            opacity={0.5}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
          />

          <LineSeries
            yAccessor={(stockItems) => stockItems.wt1}
            stroke="#FF0000"
            strokeDasharray="line"
          />
          <LineSeries
            yAccessor={(stockItems) => stockItems.wt2}
            stroke="#006400"
            strokeDasharray="line"
          />
          <MyOHLCTooltip origin={[-78, -20]} />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    );
  }
}
MyChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

MyChart.defaultProps = {
  type: "svg",
};
MyChart = fitWidth(MyChart);

export default MyChart;
