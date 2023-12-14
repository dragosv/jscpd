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
    it("should have expected values", () => {
      sarifReport = reporter.generateSarif(clones);

      expect(sarifReport).to.not.be.null;

      expect(sarifReport.$schema).to.equal("https://json.schemastore.org/sarif-2.1.0.json");
      expect(sarifReport.version).to.equal("2.1.0");

      expect(sarifReport.runs.length).to.equal(1);
      expect(sarifReport.runs[0].tool.driver.name).to.equal("JSCPD");

      expect(sarifReport.runs[0].results.length).to.equal(clones.length);
    });

    it("should validate against sarif json schema", () => {
      const ajv = new Ajv({allErrors: true, $data: true, verbose: true});
      addFormats(ajv);
      ajvErrors(ajv);

      sarifReport = reporter.generateSarif(clones);

      const valid = ajv.validate(sarifSchema, sarifReport);

      if (!valid) {
        const errors = ajv.errors;

        assert.fail(false, true, "Schema validation failed:" + JSON.stringify(errors));
      }
    });
  });
});


