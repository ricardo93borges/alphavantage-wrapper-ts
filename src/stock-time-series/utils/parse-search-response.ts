import { ParseResponseError } from '../../errors';
import { SearchAPIResponseDTO } from '../dto/search-api-response.dto';
import { SearchResponseDTO } from '../dto/search-response.dto';

function parseSearchResponse(data: SearchAPIResponseDTO): SearchResponseDTO[] {
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

export default parseSearchResponse;
