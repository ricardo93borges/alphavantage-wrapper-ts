export class CustomError extends Error {
  constructor(message: string, details: any) {
    super(
      `${message} - ${
        typeof details === 'object' ? JSON.stringify(details) : details
      }`
    )
  }
}

export class AlphaVantageRequestError extends CustomError {}

export class ParseResponseError extends CustomError {}
