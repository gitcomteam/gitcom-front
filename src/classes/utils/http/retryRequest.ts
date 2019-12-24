export function retryRequest(funcToExec: any, getTargetRef: any, targetValue: any, retryCount: number = 7) {
    let execCount = 0;
    executeFunc(funcToExec, execCount, getTargetRef, targetValue, retryCount);
}

function executeFunc(funcToExec: any, execCount: number, getTargetRef: any, targetValue: any, retryCount: number) {
    try {
        if (execCount < retryCount && getTargetRef() != targetValue) {
            setTimeout(() => {
                funcToExec();
                executeFunc(funcToExec, execCount, getTargetRef, targetValue, retryCount);
            }, 500 + (500 * execCount));
            execCount++;
        }
    } catch (e) {
        // ignored
    }
}
