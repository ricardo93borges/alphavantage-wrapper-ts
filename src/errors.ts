export class CustomError extends Error {
  constructor(message: string, details: any) {
    super(
      `${message} - ${
        typeof details === 'object' ? JSON.stringify(details) : details
      }`
    )
  }
}

export class AlphaVantageRequestError extends CustomError {
  constructor(message: string, details: any) {
    super(message, details)
  }
}

export class ParseResponseError extends CustomError {
  constructor(message: string, details: any) {
    super(message, details)
  }
}
