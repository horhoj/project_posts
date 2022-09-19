export const delay = (delay: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, delay));

delay(5000).then(() => {
  alert('hello');
});
