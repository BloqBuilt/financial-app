import { WeekChunkerPipe } from './week-chunker.pipe';

fdescribe('WeekChunkerPipe', () => {
  it('create an instance', () => {
    const pipe = new WeekChunkerPipe();
    expect(pipe).toBeTruthy();
  });

  it('breaks array into chunks of 7 elements', () => {
    const pipe = new WeekChunkerPipe();
    const originalArray = new Array(14).fill(1);
    const expectedChunkedArray = [new Array(7).fill(1), new Array(7).fill(1)];
    const chunkedArray = pipe.transform(originalArray);
    expect(chunkedArray).toEqual(expectedChunkedArray);
  });
});
