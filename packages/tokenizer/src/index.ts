import {IOptions, ITokenizer, ITokensMap} from '@jscpd/core';
import {createTokenMapBasedOnCode} from './tokenize.js';

export * from './interfaces/format-meta.interface.js';
export * from './interfaces/index.js';
export * from './interfaces/source-options.interface.js';
export * from './tokenize.js';
export * from './token-map.js';
export * from './formats.js';

export class Tokenizer implements ITokenizer {
  generateMaps(id: string, data: string, format: string, options: Partial<IOptions>): ITokensMap[] {
    return createTokenMapBasedOnCode(id, data, format, options);
  }
}
