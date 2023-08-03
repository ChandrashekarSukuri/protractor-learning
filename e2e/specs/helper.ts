export class JasmineUtility{
  str = '';
  ageSubmit(age:number){
    if(age>120){
      throw Error('Age should not exceed 120');
    }
    if(age<0){
      throw Error('Age should not be less than 0');
    }
    return true;
  }

  getStrValue(){
    return this.str;
  }

  getPromiseTimeout(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve('timoutTest');
        },200)
    })
  }

  timeout:any;
  timeoutFun(){
    this.timeout = setTimeout(()=>{
      this.str = 'timeout';
    },2000)
  }

  clearTimeouts(){
    clearTimeout(this.timeout);
  }

  customEqualityTestFun(actual:any, expected:any){
    return actual.length == expected.length;
  }

  calculateAverage(arr:number[]):number{
    const positiveNumbers = arr.filter((num)=> num>=0);
    if(positiveNumbers.length == 0){
      throw Error('No positive integers found');
    }
    const sum = positiveNumbers.reduce((sum,num)=> sum+num,0);
    return sum/positiveNumbers.length;
  }


}
