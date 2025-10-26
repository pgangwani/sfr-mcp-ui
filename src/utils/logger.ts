export const logger = {
  info: (message: string, data?: any) => createLog("INFO", message, data),
  debug: (message: string, data?: any) => createLog("DEBUG", message, data),
  warn: (message: string, data?: any) => createLog("WARN", message, data),
  error: (message: string, data?: any) => createLog("ERROR", message, data),
};

// Utility function to create structured logs
export function createLog(level: string, message: string, data?: any) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...data,
  };

  // log all messages in the browser, not in the server
  const shouldLogAll = typeof window !== "undefined";

  const logMessage = `[MCP] ${message}`;

  if (level === "ERROR") {
    // Always log errors
    console.error(logMessage, logEntry);
  } else if (level === "WARN" && shouldLogAll) {
    console.warn(logMessage, logEntry);
  } else if (level === "INFO" && shouldLogAll) {
    console.info(logMessage, logEntry);
  } else if (level === "DEBUG" && shouldLogAll) {
    console.debug(logMessage, logEntry);
  } else if (shouldLogAll) {
    console.log(`[${level}] ${logMessage}`, logEntry);
  }
  return logEntry;
}
