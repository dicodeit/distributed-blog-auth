import http from 'http';
import morgan, { TokenIndexer } from 'morgan';
import { isNil, Optional } from './types';


// This is same as 'dev' predefined formatter, re-inventing the wheel just for learning purposes
// Goal achieved? YES
const statusColor = (status: Optional<number>): number => {
  if (isNil(status)) return 0;
  if (status >= 500) return 31; // RED
  if (status >= 400) return 33 // YELLOW
  if (status >= 300) return 36 // CYAN
  if (status >= 200) return 32 // GREEN

  return 0;
}

const formatters: Record<number, ReturnType<typeof morgan.compile>> = {};
type Request = http.IncomingMessage
type Response = http.ServerResponse;

morgan.format('local', (tokens: TokenIndexer<Request, Response>, req: Request, res: Response) => {
  const status = res.headersSent ? res.statusCode : undefined
  const color = statusColor(status);

  let formatter = formatters[color];

  if (!formatter) {
    formatter = formatters[color] = morgan.compile('\x1b[0m:method :url \x1b[' +
      color + 'm:status\x1b[0m :response-time ms - :res[content-length]\x1b[0m');
  }

  return formatter(tokens, req, res);
});

export const logger = () => {
  return morgan('local');
}