import {IOptions} from '@jscpd/core';
import {bold, white} from 'colors/safe.js';

export function printOptions(options: IOptions): void {
  console.log(bold(white('Options:')));
  console.dir(options);
}
