// Error Logger
const errorLogger = {
    logError: function (error, context = {}) {
        const timestamp = new Date().toISOString();
        const errorMessage = `[${timestamp}] ${error.name}: ${error.message}`;
        const contextMessage = context.context ? `Context: ${context.context}` : '';

        console.error(errorMessage);
        if (contextMessage) console.error(contextMessage);
        if (error.stack) console.error(error.stack);

        // You can add additional error logging here, like sending to a server
    }
};

export { errorLogger }; 