import * as fs from 'fs';
import * as path from 'path';

export class Logger {
    private static logDir = 'test-results/logs';
    private static currentTest: string;

    static init() {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }

    static setCurrentTest(testInfo: string) {
        this.currentTest = testInfo;
    }

    static info(message: string) {
        this.log('INFO', message);
    }

    static error(message: string, error?: Error) {
        this.log('ERROR', message);
        if (error) {
            this.log('ERROR', `Stack: ${error.stack}`);
        }
    }

    static debug(message: string) {
        this.log('DEBUG', message);
    }

    private static log(level: string, message: string) {
        const timestamp = new Date().toISOString();
        const logMessage = `${timestamp} [${level}] ${this.currentTest || 'Global'}: ${message}\n`;
        
        // Console output
        console.log(logMessage);

        // File output
        const logFile = path.join(this.logDir, `${new Date().toISOString().split('T')[0]}.log`);
        fs.appendFileSync(logFile, logMessage);
    }
}

// Initialize logger
Logger.init();