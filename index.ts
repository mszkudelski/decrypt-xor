import * as fs from 'fs';
import ErrnoException = NodeJS.ErrnoException;

const convertTo = (input: string, encoding: number): number[] => {
  return input
    .split('')
    .reduce(
      (result, currentChar) => [
        ...result,
        (encoding === 2 ? '0b' : '') +
          currentChar.charCodeAt(0).toString(encoding),
      ],
      [],
    );
};

const convertBitsToString = (input: number[]): string[] => {
  return input.map((item) => String.fromCharCode(item));
};

const xor = (value: number[], value1: number[]): number[] => {
  return value1.map((char, index) => value[index] ^ char);
};

const handleFile: (err: ErrnoException, data: Buffer) => void = (
  err: ErrnoException,
  data: Buffer,
): void => {
  const fileContent: string = data.toString();
  let binary: number[] = convertTo(fileContent, 2);
  const binaryLength: number = binary.reduce(
    (result, item) => result + item.toString(2).length,
    0,
  );
  const notWord: number[] = convertTo(' nie ', 2);

  for (let i = 0; i <= 100; i++) {
    binary = convertTo(fileContent << 1, 2);
    console.log(convertBitsToString(xor(binary, notWord)).join(''));
  }
};

fs.readFile('code.xor', handleFile);
