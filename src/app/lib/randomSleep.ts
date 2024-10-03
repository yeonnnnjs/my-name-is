const randomSleep = async (min: number, max: number) => {
  if(min >= max) {
    throw new RangeError(`Minimum ${min} is out of range`);
  }
  const randomMs = Math.floor(Math.random() * (max - min + 1)) + min;
  await new Promise(resolve => setTimeout(resolve, randomMs));
  return randomMs;
}

export default randomSleep;
