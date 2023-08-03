import {browser} from "protractor";
import {JasmineUtility} from "./helper";

describe('Calculate average method',()=>{
    let utility;

    beforeAll(()=>{
        utility = new JasmineUtility();
    })
    it('should calculate the average of positive numbers', ()=>{
        const arr = [6,2,7,5];
        const average = utility.calculateAverage(arr);
        expect(average).toEqual(5);
    })

    it('should ignore the negative integers while average calculation', ()=>{
        const arr = [6,2,-7,-5];
        const average = utility.calculateAverage(arr);
        expect(average).toEqual(4);
    })

    it('should throw an error when there are no positive integers', ()=>{
        const arr = [-6,-2,-7,-5];
        expect(function (){return utility.calculateAverage(arr);}).toThrowError('No positive integers found');
    })
})
