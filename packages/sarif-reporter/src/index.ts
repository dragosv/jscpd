import { ensureDirSync, writeFileSync } from 'fs-extra';
import { getOption, IClone, IOptions } from '@jscpd/core';
import { green } from 'colors/safe';
import { join } from "path";
import { IReporter } from "@jscpd/finder";
import { getPath } from "@jscpd/finder/src/utils/reports";

export interface IRule {
  id: string;
  name: string;
  shortDescription: {
    text: string;
  };
  fullDescription: {
    text: string;
  };
  defaultConfiguration: {
    level: string;
  };
  properties: {
    id: string;
    kind: string;
    name: string;
    precision: string;
    problem: {
      severity: string;
    };
  };
}

export interface ITool {
  driver: {
    name: string;
    rules: IRule[];
  };
}

export interface ILocation {
  physicalLocation: {
    artifactLocation: {
      uri: string;
      uriBaseId: string;
    };
    region: {
      startLine: number;
      endLine: number;
      startColumn: number;
      endColumn: number;
    };
  };
}

export interface IResult {
  ruleId: string;
  ruleIndex: number;
  message: {
    text: string;
  };
  locations: ILocation[];
  // partialFingerprints: {
  //   primaryLocationLineHash: string;
  //   primaryLocationStartColumnFingerprint: string;
  // };
}

export interface IRun {
  tool: {
    driver: {
      name: string;
      rules: IRule[];
    };
  };
  results: IResult[];
}
export interface ISarifReport {
  "$schema": string;
  version: string;
  runs: IRun[];
}

export class SarifReporter implements IReporter {

  constructor(private options: IOptions) {
  }

  public generateSarif(clones: IClone[]): ISarifReport {
    return {
      $schema: "https://json.schemastore.org/sarif-2.1.0.json",
      version: "2.1.0",
      runs: [{
        tool: {
          driver: {
            name: "JSCPD",
            rules: []
          }
        },
        results: clones.map(clone => this.cloneFound(clone))
      }]
    };
  }

  public report(clones: IClone[]): void {
    const json = this.generateSarif(clones);
    ensureDirSync(getOption('output', this.options));
    writeFileSync(getOption('output', this.options) + '/jscpd-report.sarif', JSON.stringify(json, null, '  '));
    console.log(green(`SARIF report saved to ${join(this.options.output, 'jscpd-report.sarif')}`));
  }

  private cloneFound(clone: IClone): IResult {
    const startLineA = clone.duplicationA.start.line;
    const endLineA = clone.duplicationA.end.line;
    const startLineB = clone.duplicationB.start.line;
    const endLineB = clone.duplicationB.end.line;

    const firstLocation: ILocation = {
      physicalLocation: {
        artifactLocation: {
          uri: getPath(clone.duplicationA.sourceId, this.options),
          uriBaseId: ""
        },
        region: {
          startLine: startLineA,
          endLine: endLineA,
          startColumn: 1,
          endColumn: 1
        }
      }
    }

    const secondLocation: ILocation = {
      physicalLocation: {
        artifactLocation: {
          uri: getPath(clone.duplicationB.sourceId, this.options),
          uriBaseId: ""
        },
        region: {
          startLine: startLineB,
          endLine: endLineB,
          startColumn: 1,
          endColumn: 1
        }
      }
    }

    return {
      ruleId: "CPD01",
      ruleIndex: 1,
      message: {
        text: "Code duplication found"
      },
      locations: [firstLocation, secondLocation],
      // partialFingerprints: {
      //   primaryLocationLineHash: string,
      //   primaryLocationStartColumnFingerprint: string
      // }
    };
  }
}
