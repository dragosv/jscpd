import {dirname, resolve} from "path";
import {existsSync} from "fs";
import {Command} from 'commander';
import {readJSONSync} from 'fs-extra';
import {getDefaultOptions, IOptions} from '@jscpd/core';
import {parseFormatsExtensions} from '@jscpd/finder';

const convertCliToOptions = (cli: Command): Partial<IOptions> => {
  const options = cli.opts();

  const result: Partial<IOptions> = {
    minTokens: options.minTokens ? parseInt(options.minTokens) : undefined,
    minLines: options.minLines ? parseInt(options.minLines) : undefined,
    maxLines: options.maxLines ? parseInt(options.maxLines) : undefined,
    maxSize: options.maxSize,
    debug: options.debug,
    store: options.store,
    pattern: options.pattern,
    executionId: options.executionId,
    silent: options.silent,
    blame: options.blame,
    verbose: options.verbose,
    cache: options.cache,
    output: options.output,
    format: options.format,
    formatsExts: parseFormatsExtensions(options.formatsExts),
    list: options.list,
    mode: options.mode,
    absolute: options.absolute,
    noSymlinks: options.noSymlinks,
    skipLocal: options.skipLocal,
    ignoreCase: options.ignoreCase,
    gitignore: options.gitignore,
    exitCode: options.exitCode,
  };

  if (options.threshold !== undefined) {
    result.threshold = Number(options.threshold);
  }

  if (options.reporters) {
    result.reporters = options.reporters.split(',');
  }

  if (options.format) {
    result.format = options.format.split(',');
  }
  if (options.ignore) {
    result.ignore = options.ignore.split(',');
  }
  if(options.ignorePattern){
    result.ignorePattern = options.ignorePattern.split(',');
  }
  result.path = options.path ? [options.path].concat(options.args) : options.args;

  if (result.path.length === 0) {
    delete result.path;
  }

  Object.keys(result).forEach((key) => {
    if (typeof result[key] === 'undefined') {
      delete result[key];
    }
  });

  return result;
}

const readConfigJson = (config: string | undefined): Partial<IOptions> => {
  const configFile: string = config ? resolve(config) : resolve('.jscpd.json');
  const configExists = existsSync(configFile);
  if (configExists) {
    const result = {config: configFile, ...readJSONSync(configFile)};
    if (result.path) {
      result.path = result.path.map((path: string) => resolve(dirname(configFile), path));
    }
    return result;
  }
  return {};
}

const readPackageJsonConfig = (): Partial<IOptions> => {
  const config = resolve(process.cwd() + '/package.json');
  if (existsSync(config)) {
    const json = readJSONSync(config);
    if (json.jscpd && json.jscpd.path) {
      json.jscpd.path = json.jscpd.path.map((path: string) => resolve(dirname(config), path));
    }
    return json.jscpd ? {config, ...json.jscpd} : {};
  }
  return {};
}

export function prepareOptions(cli: Command): IOptions {
  const storedConfig: Partial<IOptions> = readConfigJson(cli.opts().config);
  const packageJsonConfig: Partial<IOptions> = readPackageJsonConfig();

  const argsConfig: Partial<IOptions> = convertCliToOptions(cli);

  const result: IOptions = {
    ...getDefaultOptions(),
    ...packageJsonConfig,
    ...storedConfig,
    ...argsConfig,
  };
  result.reporters = result.reporters || [];
  result.listeners = result.listeners || [];

  if (result.silent) {
    result.reporters = result.reporters
      .filter(
        (reporter) => !reporter.includes('console'),
      )
      .concat('silent');
  }

  if (result.threshold !== undefined) {
    result.reporters = [...result.reporters, 'threshold'];
  }

  return result;
}
