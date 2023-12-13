import {assert, expect} from "chai";
import { SarifReporter, ISarifReport } from "../src/index";
import { IClone } from "@jscpd/core";
import Ajv, {JSONSchemaType, ValidateFunction} from "ajv"
import addFormats from "ajv-formats"
import $RefParser from "@apidevtools/json-schema-ref-parser";

describe("SarifReporter", () => {
  let reporter: SarifReporter;
  let clones: IClone[];
  let sarifReport: ISarifReport;
  let ajv: Ajv;
  let validate: ValidateFunction;

  before(async () => {
    ajv = new Ajv();
    addFormats(ajv);

    let sarifSchema: $RefParser.JSONSchema;
    let parser = new $RefParser();

    sarifSchema = await parser.dereference("schema/sarif-2.1.0.json");

    console.log("Schema: " + sarifSchema.$id);

    ajv.addSchema(require("../schema/sarif-2.1.0.json"), sarifSchema.$id);

    validate = ajv.getSchema(sarifSchema.$id);
  });

  beforeEach(() => {
    // Initialize the reporter and clones for each test
    reporter = new SarifReporter({});
    clones = [
      // Define your test clones here
    ];
  });

  afterEach(() => {
    expect(sarifReport).to.not.be.null;

    expect(sarifReport.$schema).to.equal("https://json.schemastore.org/sarif-2.1.0.json");
    expect(sarifReport.version).to.equal("2.1.0");

    expect(sarifReport.runs.length).to.equal(1);
    expect(sarifReport.runs[0].tool.driver.name).to.equal("JSCPD");
    expect(sarifReport.runs[0].results.length).to.equal(clones.length);

    const sarifReportAsJson = JSON.stringify(sarifReport);
    console.log(sarifReportAsJson);

    if (!validate(sarifReportAsJson)) {
      assert.fail(false, true, "Schema validation failed:" + JSON.stringify(validate.errors));
    }
  });

  describe("generateSarif", () => {
    it("should generate a valid SarifReport", () => {
      sarifReport = reporter.generateSarif(clones);
    });
  });
});
