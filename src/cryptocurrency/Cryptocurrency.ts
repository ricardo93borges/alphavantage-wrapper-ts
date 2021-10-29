import { AxiosInstance } from 'axios';
import { DataType } from '..';
import { Category } from '../Category';
import { Function } from '../enum/function.enum';
import { AlphaVantageRequestError, ParseResponseError } from '../errors';
import { IntradayResponseDTO } from './dto/intraday-response.dto';
import { IntradayDTO } from './dto/intraday.dto';
import parseResponse from './utils/parse-response';
import { getParseIntradayResponseMap } from './utils/parse-response-maps';

export class Cryptocurrency extends Category {
  constructor(api: AxiosInstance) {
    super(api);
  }

  async intraday(intradayDTO: IntradayDTO): Promise<IntradayResponseDTO> {
    try {
      const { data } = await this.api.get('/query', {
        params: { ...intradayDTO, function: Function.CRYPTO_INTRADAY },
      });

      if (intradayDTO.datatype === DataType.CSV) {
        return data;
      }

      return parseResponse(
        getParseIntradayResponseMap(intradayDTO.interval),
        data,
      ) as unknown as IntradayResponseDTO;
    } catch (err) {
      if (err instanceof ParseResponseError) throw err;

      throw new AlphaVantageRequestError(
        'fail to get cryptocurrency intraday',
        err,
      );
    }
  }
}
