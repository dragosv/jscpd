import {IClone, IOptions, IStatistic} from '@jscpd/core';
import {bold, grey} from 'colors/safe.js';
import {IReporter} from '../interfaces/index.js';
import {convertStatisticToArray} from '../utils/reports.js';

import * as Table from 'cli-table3';

export class ConsoleReporter implements IReporter {
	private readonly options;

	constructor(options: IOptions) {
		this.options = options;
	}

	report(clones: IClone[], statistic: IStatistic | undefined = undefined): void {
		if (statistic && !this.options.silent) {
			const table = new Table.default({
        head: ['Format', 'Files analyzed', 'Total lines', 'Total tokens', 'Clones found', 'Duplicated lines', 'Duplicated tokens'],
      });
			Object.keys(statistic.formats)
				.filter((format) => statistic.formats[format].sources)
				.forEach((format: string) => {
					table.push(convertStatisticToArray(format, statistic.formats[format].total));
				});
			table.push(convertStatisticToArray(bold('Total:'), statistic.total));
			console.log(table.toString());
      console.log(grey(`Found ${clones.length} clones.`));
		}
	}
}
