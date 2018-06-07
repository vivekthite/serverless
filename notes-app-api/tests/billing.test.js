import { calculateCost } from "../libs/billing-lib";

test('Lower Tier' , () => {
    const storage = 10;
    const expectedCost = 4000
    const actualCost = calculateCost(storage);
    expect(actualCost).toEqual(expectedCost);
});

test('Middle Tier' , () => {
    const storage = 100;
    const expectedCost = 20000
    const actualCost = calculateCost(storage);
    expect(actualCost).toEqual(expectedCost);
});

test('Highest Tier' , () => {
    const storage = 101;
    const expectedCost = 10100
    const actualCost = calculateCost(storage);
    expect(actualCost).toEqual(expectedCost);
});