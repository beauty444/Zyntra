import pino from "pino";

// Use process.env to access environment variables
const isProd = process.env.NODE_ENV === "production";

export const logger = pino({
  level: process.env.LOG_LEVEL || "info", // fallback to 'info' if LOG_LEVEL not set
  transport: isProd
    ? undefined
    : {
        target: "pino-pretty",
        options: { colorize: true, translateTime: "SYS:standard" },
      },
});

// Morgan stream bridge to Pino
export const httpLoggerStream = {
  write: (message) => logger.info(message.trim()),
};
