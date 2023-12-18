import {assert, expect} from "chai";
import { SarifReporter, ISarifReport } from "../src/index";
import { IClone } from "@jscpd/core";
import Ajv, { ValidateFunction} from "ajv"
import addFormats from "ajv-formats"
import ajvErrors from "ajv-errors";
import * as sarifSchema from "../schema/sarif-2.1.0.json";

describe("SarifReporter", () => {
  let reporter: SarifReporter;
  let clones: IClone[];
  let sarifReport: ISarifReport;

  beforeEach(() => {
    // Initialize the reporter and clones for each test
    reporter = new SarifReporter({});
    clones = [];
  });

  describe("generateSarif", () => {
    it("should have expected default values", () => {
      sarifReport = reporter.generateSarif(clones);

      expect(sarifReport).to.not.be.null;

      expect(sarifReport.$schema).to.equal("https://json.schemastore.org/sarif-2.1.0.json");
      expect(sarifReport.version).to.equal("2.1.0");

      expect(sarifReport.runs.length).to.equal(1);
      expect(sarifReport.runs[0].tool.driver.name).to.equal("JSCPD");

      expect(sarifReport.runs[0].results.length).to.equal(clones.length);
    });

    it("should generate expected sarif report", () => {
      clones = [  {
        format: 'typescript',
        duplicationA: {
          sourceId: 'sourceA',
          start: { line: 1, column: 1 },
          end: { line: 5, column: 10 },
          range: [0, 50],
        },
        duplicationB: {
          sourceId: 'sourceB',
          start: { line: 10, column: 1 },
          end: { line: 15, column: 10 },
          range: [100, 150],
        },
      }];

      sarifReport = reporter.generateSarif(clones);

      expect(sarifReport).to.not.be.null;

      expect(sarifReport.runs.length).to.equal(1);
      expect(sarifReport.runs[0].results.length).to.equal(1);
      expect(sarifReport.runs[0].results[0].locations.length).to.equal(2);
      expect(sarifReport.runs[0].results[0].locations[0].physicalLocation.artifactLocation.uri).to.equal("sourceA");
      expect(sarifReport.runs[0].results[0].locations[0].physicalLocation.region.startLine).to.equal(1);
      expect(sarifReport.runs[0].results[0].locations[0].physicalLocation.region.endLine).to.equal(5);
      expect(sarifReport.runs[0].results[0].locations[1].physicalLocation.artifactLocation.uri).to.equal("sourceB");
      expect(sarifReport.runs[0].results[0].locations[1].physicalLocation.region.startLine).to.equal(10);
      expect(sarifReport.runs[0].results[0].locations[1].physicalLocation.region.endLine).to.equal(15);
      //expect(sarifReport.runs[0].results[0].properties).to.not.be.null;
    });

    it("should validate against sarif json schema", () => {
      const ajv = new Ajv({allErrors: true, $data: true, verbose: true});
      addFormats(ajv);
      ajvErrors(ajv);

      clones = [  {
        format: 'typescript',
        duplicationA: {
          sourceId: 'sourceA',
          start: { line: 1, column: 1 },
          end: { line: 5, column: 10 },
          range: [0, 50],
        },
        duplicationB: {
          sourceId: 'sourceB',
          start: { line: 10, column: 1 },
          end: { line: 15, column: 10 },
          range: [100, 150],
        },
      }];

      sarifReport = reporter.generateSarif(clones);

      const valid = ajv.validate(sarifSchema, sarifReport);

      if (!valid) {
        const errors = ajv.errors;

        assert.fail(false, true, "Schema validation failed:" + JSON.stringify(errors));
      }
    });
  });
});


