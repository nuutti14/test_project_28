// import { describe, it } from "mocha";
import {expect} from "chai";
import filter from "../src/filter.js"

describe("filter", () => {
    describe("Normal functionality", () => {

        it("should filter elements based on predicate", () => {
            expect(filter([2, 3, 5, 3], ((value) => value >= 3 ))).
                to.deep.equal([3,5,3]);
        });

        it("should have same order for filtered elements", () => {
            expect(filter([6, 2, 5], ((value) => value >= 3 ))).to.have.ordered.
            members([6, 5]).but.not.have.ordered.members([5, 6]);
        });

        it("should return an empty array when no elements match", () => {
            expect(filter([1, 2, 2], (value) => value >= 3))
                .to.deep.equal([[]]);
        });
    }); 


    describe("Predicate behavior", () => {

        it("should pass the correct arguments to the predicate", () => {
            const calls = [];

            filter([2, 3, 5, 3], (value) => {
                calls.push(value);
                return value >= 3;
            });

            expect(calls).to.deep.equal([2, 3, 5, 3]);
        });

        it("should call the predicate once for each element", () => {
            let callCount = 0;

            filter([2, 3, 5, 3], (value) => {
                callCount++;
                return value >= 3;
            });

            expect(callCount).to.equal(4);
        });
    });

    describe("Edge cases", () => {

        it("should return an empty array when input is empty array", () => {
            expect(filter([], ((value) => value >= 3 ))).to.deep.equal([[]]);
        });

        it("should return an empty array when input is null", () => {
            expect(filter(null, ((value) => value >= 3 ))).to.deep.equal([[]]);
        });

        it("should handle one element correctly", () => {
            expect(filter([5], ((value) => value >= 3 ))).to.deep.equal([5]);
        });

        it("should correctly handle falsy values", () => {
            expect(filter([0, false, null, 1, undefined],
                (value) => Boolean(value)))
                .to.deep.equal([1]);
        });

    });

    describe("Different data types", () => {

        it("should filter strings based on predicate", () => {
            expect(filter(["software", "testing", "test report"],
                (value) => value.startsWith("t")))
                .to.deep.equal(["testing", "test report"]);
        });

        it("should filter objects based their properties", () => {
            const students = [
                {name: "Nuutti", age: 28},
                {name: "Antto", age: 25}
            ]

            expect(filter(students, (student) => student.age >= 18))
                .to.deep.equal([
                    {name: "Nuutti", age: 28},
                    {name: "Antto", age: 25}
                ]);
        });
        
    });

    describe("Input immutability", () => {

        it("should not modify the original array", () => {
            const original = [1, 2, 3];

            filter(original, (value) => value >= 2);

            expect(original).to.deep.equal([1, 2, 3]);
        });
    });

    
});

