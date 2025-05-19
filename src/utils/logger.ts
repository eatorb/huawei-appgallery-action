export const logStep = (message: string): void => {
    console.log('[Step] ', message)
};

export const logSuccess = (message: string): void => {
    console.log('[Success] ', message)
};

export const logError = (message: string): void => {
    console.log('[Error] ', message);
};

export const logWarning = (message: string): void => {
    console.log('[Warning] ', message);
};

export const logInfo = (label: string, value: string): void => {
    console.log(label, ':', value)
};