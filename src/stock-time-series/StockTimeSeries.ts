import { AxiosInstance } from 'axios';
import { Category } from '../Category';
import { Function } from '../enum/function.enum';
import { Interval } from '../enum/interval.enum';
import { AlphaVantageRequestError } from '../errors';
import { IntradayResponseDTO, TimeSeries } from './dto/intraday-response.dto';
import { IntradayDTO } from './dto/intraday.dto';

export class StockTimeSeries extends Category {
  constructor(api: AxiosInstance) {
    super(api);
  }

  protected convertIntradayData(
    data: any,
    interval: Interval,
  ): IntradayResponseDTO {
    const metaData = {
      information: data['Meta Data']['1. Information'],
      symbol: data['Meta Data']['2. Symbol'],
      lastRefreshed: data['Meta Data']['3. Last Refreshed'],
      interval: data['Meta Data']['4. Interval'],
      outputSize: data['Meta Data']['5. Output Size'],
      timeZone: data['Meta Data']['6. Time Zone'],
    };

    const timeSeriesKeys = Object.keys(
      data[`Time Series (${Interval.FIVE_MIN})`],
    );

    let timeSeries: { [key: string]: TimeSeries } = {};
    for (let i = 0; i < timeSeriesKeys.length; i++) {
      let key = timeSeriesKeys[i];
      let timeSeriesItem = data[`Time Series (${interval})`][key];
      timeSeries[key] = {
        open: timeSeriesItem['1. open'],
        high: timeSeriesItem['2. high'],
        low: timeSeriesItem['3. low'],
        close: timeSeriesItem['4. close'],
        volume: timeSeriesItem['5. volume'],
      };
    }

    return { metaData, timeSeries };
  }

  async intraday(intradayDTO: IntradayDTO): Promise<IntradayResponseDTO> {
    try {
      const { data } = await this.api.get('/query', {
        params: { ...intradayDTO, function: Function.TIME_SERIES_INTRADAY },
      });

      return this.convertIntradayData(data, intradayDTO.interval);
    } catch (err) {
      throw new AlphaVantageRequestError(
        `fail to get intraday data. ${JSON.stringify(err)}`,
      );
    }
  }
}
