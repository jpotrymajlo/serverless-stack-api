import {calculateCost} from "../libs/billing-lib";

test ("lowest ", () => {
    const storage = 10;
    const expectedCost = 4000;
    const cost = calculateCost(storage);
    expect(cost).toEqual(expectedCost);
});

test ("middle", () => {
    const storage = 100;
    const expectedCost = 20000;
    const cost = calculateCost(storage);
    expect(cost).toEqual(expectedCost);
});

test ("high", () => {
    const storage = 101;
    const expectedCost = 10100;
    const cost = calculateCost(storage);
    expect(cost).toEqual(expectedCost);
});

