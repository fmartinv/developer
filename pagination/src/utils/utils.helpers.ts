export const range = (start: number, end: number): number[] => {
  if (typeof start !== 'number' || typeof end !== 'number') {
    throw new Error('Both start and end must be numbers')
  }
  return [...Array(end).keys()].map(el => el + start)
}
