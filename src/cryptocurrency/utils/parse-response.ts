import { ParseResponseError } from '../../errors';

export type ParseResponseMap = {
  [key: string]: any;
};

export type ParsedResponseMetadata = {
  [key: string]: string;
};

export type ParsedResponseTimeSeries = {
  [key: string]: { [key: string]: string };
};

export type ParsedResponse = {
  metadata: ParsedResponseMetadata;
  timeSeries: ParsedResponseTimeSeries;
};

function parseResponse(
  map: ParseResponseMap,
  response: { [key: string]: any },
): ParsedResponse {
  try {
    let metadata: ParsedResponseMetadata = {};
    let timeSeries: ParsedResponseTimeSeries = {};

    Object.keys(map.metadata).forEach((key) => {
      metadata[key] = response['Meta Data'][map.metadata[key]];
    });

    const timeSeriesKeys = Object.keys(response[map.timeSeriesKey]);

    for (let i = 0; i < timeSeriesKeys.length; i++) {
      let date = timeSeriesKeys[i];
      timeSeries[date] = {};
      Object.keys(map.timeSeries).forEach((key) => {
        timeSeries[date][key] =
          response[map.timeSeriesKey][date][map.timeSeries[key]];
      });
    }

    return { metadata, timeSeries };
  } catch (err) {
    throw new ParseResponseError('fail to parse response', err);
  }
}

export default parseResponse;
