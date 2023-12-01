import {ensureDirSync, writeFileSync} from 'fs-extra';
import {getOption, IBlamedLines, IClone, IOptions, IStatistic, ITokenLocation} from '@jscpd/core';
import {green} from 'colors/safe';
import {join} from "path";
import {IReporter} from "@jscpd/finder";

interface IRule {
  id: string,
  name: string,
  shortDescription: {
    text: string
  },
  fullDescription: {
    text: string
  },
  defaultConfiguration: {
    level: string
  },
  properties: {
    tags: string[],
    precision: string
  }
}

interface ILocation {
  physicalLocation: {
    artifactLocation: {
      uri: string,
      uriBaseId: string
    },
    region: {
      startLine: number,
      startColumn: number,
      endColumn: number
    }
  }
}

interface IResult {
  ruleId: "D01",
  ruleIndex: number,
  message: {
    text: string
  },
  locations: ILocation[],
  partialFingerprints: {
    primaryLocationLineHash: string,
    primaryLocationStartColumnFingerprint: string
  }

  format: string;
  lines: number;
  tokens: number;
  firstFile: {
    name: string;
    start: number;
    end: number;
    startLoc: ITokenLocation;
    endLoc: ITokenLocation;
    blame?: IBlamedLines;
  };
  secondFile: {
    name: string;
    start: number;
    end: number;
    startLoc: ITokenLocation;
    endLoc: ITokenLocation;
    blame?: IBlamedLines;
  };
  fragment: string;
}

interface ISarifReport {
  results: IResult[];
  statistics: IStatistic;
}

export class SarifReporter implements IReporter {

  constructor(private options: IOptions) {
  }

  public generateJson(clones: IClone[], statistics: IStatistic): ISarifReport {
    return {
      statistics,
      results: clones.map(clone => this.cloneFound(clone))
    };
  }

  public report(clones: IClone[], statistic: IStatistic): void {
    const json = this.generateJson(clones, statistic);
    ensureDirSync(getOption('output', this.options));
    writeFileSync(getOption('output', this.options) + '/jscpd-report.json', JSON.stringify(json, null, '  '));
    console.log(green(`JSON report saved to ${join(this.options.output, 'jscpd-report.json')}`));
  }

  private cloneFound(clone: IClone): IResult {
    const startLineA = clone.duplicationA.start.line;
    const endLineA = clone.duplicationA.end.line;
    const startLineB = clone.duplicationB.start.line;
    const endLineB = clone.duplicationB.end.line;

    return {
      format: clone.format,
      lines: endLineA - startLineA + 1,
      fragment: clone.duplicationA.fragment,
      tokens: 0,
      firstFile: {
        name: getPath(clone.duplicationA.sourceId, this.options),
        start: startLineA,
        end: endLineA,
        startLoc: clone.duplicationA.start,
        endLoc: clone.duplicationA.end,
        blame: clone.duplicationA.blame,
      },
      secondFile: {
        name: getPath(clone.duplicationB.sourceId, this.options),
        start: startLineB,
        end: endLineB,
        startLoc: clone.duplicationB.start,
        endLoc: clone.duplicationB.end,
        blame: clone.duplicationB.blame,
      },
    };
  }
}
