import { AxiosInstance } from 'axios';
import { DataType } from '..';
import { Category } from '../Category';
import { Function } from '../enum/function.enum';
import { Interval } from '../enum/interval.enum';
import { AlphaVantageRequestError, ParseResponseError } from '../errors';
import {
  APIResponseMetadata,
  APIResponseTimeSeriesItem,
  IntradayAPIResponse,
} from './dto/intraday-api-response.dto';
import { IntradayResponseDTO, TimeSeries } from './dto/intraday-response.dto';
import { IntradayDTO } from './dto/intraday.dto';
import { SearchAPIResponseDTO } from './dto/search-api-response.dto';
import { SearchResponseDTO } from './dto/search-response.dto';
import { SearchDTO } from './dto/search.dto';

export class StockTimeSeries extends Category {
  constructor(api: AxiosInstance) {
    super(api);
  }

  protected parseIntradayResponse(
    data: IntradayAPIResponse,
    interval: Interval,
  ): IntradayResponseDTO {
    try {
      const apiResponseMetadata = data['Meta Data'] as APIResponseMetadata;
      const metadata = {
        information: apiResponseMetadata['1. Information'],
        symbol: apiResponseMetadata['2. Symbol'],
        lastRefreshed: apiResponseMetadata['3. Last Refreshed'],
        interval: apiResponseMetadata['4. Interval'],
        outputSize: apiResponseMetadata['5. Output Size'],
        timeZone: apiResponseMetadata['6. Time Zone'],
      };

      const timeSeriesKeys = Object.keys(data[`Time Series (${interval})`]);
      let timeSeries: { [key: string]: TimeSeries } = {};

      for (let i = 0; i < timeSeriesKeys.length; i++) {
        let key = timeSeriesKeys[i];
        let timeSeriesItem = data[`Time Series (${interval})`][
          key
        ] as APIResponseTimeSeriesItem;

        timeSeries[key] = {
          open: timeSeriesItem['1. open'],
          high: timeSeriesItem['2. high'],
          low: timeSeriesItem['3. low'],
          close: timeSeriesItem['4. close'],
          volume: timeSeriesItem['5. volume'],
        };
      }

      return { metadata, timeSeries };
    } catch (err) {
      throw new ParseResponseError('fail to parse intraday response', err);
    }
  }

  protected parseSearchResponse(
    data: SearchAPIResponseDTO,
  ): SearchResponseDTO[] {
    try {
      return data['bestMatches'].map((match) => ({
        symbol: match['1. symbol'],
        name: match['2. name'],
        type: match['3. type'],
        region: match['4. region'],
        marketOpen: match['5. marketOpen'],
        marketClose: match['6. marketClose'],
        timezone: match['7. timezone'],
        currency: match['8. currency'],
        matchScore: match['9. matchScore'],
      }));
    } catch (err) {
      throw new ParseResponseError('fail to parse search response', err);
    }
  }

  async intraday(intradayDTO: IntradayDTO): Promise<IntradayResponseDTO> {
    try {
      const { data } = await this.api.get('/query', {
        params: { ...intradayDTO, function: Function.TIME_SERIES_INTRADAY },
      });

      if (intradayDTO.datatype === DataType.CSV) {
        return data;
      }

      return this.parseIntradayResponse(data, intradayDTO.interval);
    } catch (err) {
      if (err instanceof ParseResponseError) throw err;

      throw new AlphaVantageRequestError('fail to get intraday data', err);
    }
  }

  async search(searchDTO: SearchDTO): Promise<SearchResponseDTO[]> {
    try {
      const { data } = await this.api.get('/query', {
        params: { ...searchDTO, function: Function.SYMBOL_SEARCH },
      });

      if (searchDTO.datatype === DataType.CSV) {
        return data;
      }

      return this.parseSearchResponse(data);
    } catch (err) {
      if (err instanceof ParseResponseError) throw err;

      throw new AlphaVantageRequestError('fail to get search data', err);
    }
  }
}
