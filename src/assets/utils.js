/**
 * Utility for mocking a promise with a delay
 * @param ms
 * @returns {function(*=): Promise<unknown>}
 */
function wait (ms) {
  return (x) => {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

export { wait };
