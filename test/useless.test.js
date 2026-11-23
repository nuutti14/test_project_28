// import { describe, it } from "mocha";
import {expect} from "chai";
import isEmpty from "../src/isEmpty.js"

describe("Example test cases", () => {
    it("checks is length", () => {
        expect(isEmpty([])).to.equal(true);
    })
});

