import { expect } from "chai";
import { SarifReporter, ISarifReport } from "../src/index";
import { IClone } from "@jscpd/core";
import Ajv, {JSONSchemaType, ValidateFunction} from "ajv"
import $RefParser from "@apidevtools/json-schema-ref-parser";

describe("SarifReporter", () => {
  let reporter: SarifReporter;
  let clones: IClone[];
  let sarifReport: ISarifReport;
  let ajv: Ajv;
  let validate: ValidateFunction;

  before(async () => {
    ajv = new Ajv();
    let schema: $RefParser.JSONSchema;

    try {
      schema = await $RefParser.dereference("__tests__/sarif-2.1.0.json");
      console.log(schema);
    }
    catch(err) {
      console.error(err);
    }

    validate = ajv.compile(schema);
  });

  beforeEach(() => {
    // Initialize the reporter and clones for each test
    reporter = new SarifReporter({});
    clones = [
      // Define your test clones here
    ];
  });

  afterEach(async () => {
    expect(sarifReport).to.not.be.null

    expect(sarifReport.$schema).to.equal("https://json.schemastore.org/sarif-2.1.0.json");
    expect(sarifReport.version).to.equal("2.1.0");

    expect(sarifReport.runs.length).to.equal(1);
    expect(sarifReport.runs[0].tool.driver.name).to.equal("JSCPD");
    expect(sarifReport.runs[0].results.length).to.equal(clones.length);

    if (!validate(sarifReport)) {

    }
  });

  describe("generateSarif", () => {
    it("should generate a valid SarifReport", () => {
      sarifReport = reporter.generateSarif(clones);
    });
  });
});
