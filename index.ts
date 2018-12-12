import * as fs from 'fs';

const convertTo = (input: string, encoding: number): string => {
  return input.split('').reduce((result, currentChar) => {
    return result + currentChar.charCodeAt(0).toString(encoding) + ' ';
  }, '');
};

const xor = (value: string, value1: string): string => {
  return value1.split('').reduce((result, current, index) => {
    return result + (value[index] ^ current);
  }, '');
};

const handleFile: Function = (err, data: Buffer) => {
  const fileContent: string = data.toString();
  const binary: string = convertTo(fileContent, 2);
  const notWord: string = convertTo(' nie ', 2);
  console.log(convertTo(xor(binary, notWord), 10));
};

fs.readFile('code.xor', handleFile);
