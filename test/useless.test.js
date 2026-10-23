// import { describe, it } from "mocha";
import { expect } from "chai";
import isLength from "../src/isLength.js"

describe("Example test cases", () => {
    it("checks is length", () => {
        expect(isLength(2)).to.equal(true);
    })
});

