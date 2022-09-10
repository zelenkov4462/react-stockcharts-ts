import { timeParse } from "d3-time-format";
import { IChart } from "../Context/GetData/types";

const parseDate = timeParse("%Y-%m-%dT%H:%M:%SZ");

export function convertData(jsonData: IChart[]) {
  let stockItems = [];

  for (let json of jsonData) {
    let item = new StockItem();
    item.time = parseDate(json.time);
    item.mal = json.mal;
    item.mas = json.mas;
    item.mfi = json.mfi;
    item.rsi = json.rsi;
    item.price = json.price;
    item.wt1 = json.wt1;
    item.wt2 = json.wt2;

    if (json.long_in) {
      item.long_in = json.long_in;
    }
    if (json.long_out) {
      item.long_out = json.long_out;
    }
    if (json.short_in) {
      item.short_in = json.short_in;
    }
    if (json.short_out) {
      item.short_out = json.short_out;
    }
    if (json.tp_dot) {
      item.tp_dot = json.tp_dot;
    }
    if (json.vu_man_sell) {
      item.vu_man_sell = json.vu_man_sell;
    }
    if (json.vu_man_buy) {
      item.vu_man_buy = json.vu_man_buy;
    }
    // @ts-ignore
    stockItems.push(item);
  }
  return { stockItems };
}

export class StockItem {
  time;
  mal;
  mas;
  mfi;
  rsi;
  price;
  wt1;
  wt2;
  long_in?;
  long_out?;
  short_in?;
  short_out?;
  tp_dot?;
  vu_man_sell?;
  vu_man_buy?;
}
