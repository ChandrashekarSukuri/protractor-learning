import {JasmineUtility} from "../utility/helper";

describe("Jasmine sample test suite", ()=> {
  let funObj;
  let fun = null;
  let utility;

  beforeEach(()=>{
    utility = new JasmineUtility();
    funObj = {
      setFun:(value:string)=>{
        fun = value;
      }
    }
  })

  it('first jasmine test', ()=>{
    const a = true;
    expect(a).toBe(true);
  });

  it('should pass assertions testing with some matchers', ()=>{
    expect(true).toBe(true);
    expect('randomString').toEqual('randomString');
    expect(12.456).toBeCloseTo(12.451,2);
    const a = undefined;
    expect(a).toBeUndefined();
    expect(20).toBeGreaterThan(18);
    expect(20).toBeGreaterThanOrEqual(20);
    expect(45/('str' as any)).toBeNaN();
    expect('randomString').toContain('random');
    expect([1,2,3]).toContain(2);
    expect(false).toBeFalsy();
  });


  it('should pass the Error thrown matchers', ()=>{
    expect(function(){return utility.ageSubmit(-1)}).toThrowError();
    expect(function (){return utility.ageSubmit(130)}).toThrow(Error('Age should not exceed 120'));
  });

  it('should pass the matchers on spies', ()=>{
    spyOn(funObj,'setFun');
    funObj.setFun('first');
    funObj.setFun('second');
    expect(funObj.setFun).toHaveBeenCalled();
    expect(funObj.setFun).toHaveBeenCalledTimes(2);
    expect(funObj.setFun).toHaveBeenCalledWith('first');
    expect(funObj.setFun).toHaveBeenCalledWith('second');

    const spyFun = jasmine.createSpy('spyFun');
    spyFun('testFun');
    spyFun('testFun',()=>{return true});
    expect(spyFun).toHaveBeenCalled();

    const spyFunObj = jasmine.createSpyObj('spyFunObj',['oneMethod','twoMethod','threeMethod']);
    spyFunObj.oneMethod(1);
    spyFunObj.twoMethod([1,2]);
    expect(spyFunObj.oneMethod).toBeDefined();
    expect(spyFunObj.twoMethod).toBeDefined();
    expect(spyFunObj.oneMethod).toHaveBeenCalledWith(jasmine.any(Number))
    expect(spyFunObj.twoMethod).toHaveBeenCalledWith(jasmine.arrayContaining([2,1]))
  })

  const substringTester = {
    asymmetricMatch: (actual)=>{
      return actual.split(',')[1] == 'second';
    }
  }



  it('should pass clock matchers',()=>{
    jasmine.clock().install();
    utility.timeoutFun();
    expect(utility.getStrValue()).toEqual('');
    jasmine.clock().tick(2001);
    expect(utility.getStrValue()).toEqual('timeout');
    jasmine.clock().uninstall();
  });

  it('should pass async/await test',async ()=>{
    let myPromise = new Promise(function(resolve) {
        setTimeout(function() {resolve("timeout");}, 2000);
    });
    const promiseTimeout = await myPromise;
    expect(promiseTimeout).toEqual('timeout');
  })

  it('should pass asymmetric equality matcher',()=>{
    expect('first,second,third').toEqual(substringTester);
  })

  it('should pass custom equality tester', ()=>{
    jasmine.addCustomEqualityTester(utility.customEqualityTestFun);
    expect('abc').toEqual('xyz');
  })




})
