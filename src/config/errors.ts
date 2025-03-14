export class ClientError extends Error {

}

export class HttpError {
  public statusCode: number;
  public error: string;

  constructor(httpError: Partial<HttpError>) {
    Object.assign(this, httpError);
  }
}