import { browser, by, element, $$, $ } from 'protractor';

describe("Super calculator", ()=> {
  const firstInput = element(by.model('first'));
  const secondInput = element(by.model('second')) ;
  const goBtn = element(by.css('#gobutton'));
  const latestResult = element(by.binding('latest'));

  beforeEach( async ()=>{
    await browser.get('http://juliemr.github.io/protractor-demo/');
  })

  it('Should have the title Super Calculator', async ()=>{
    const title = await browser.getTitle();
    expect(title).toEqual('Super Calculator');
  })

   it('should add 4 and 5 correctly', async ()=>{
     await firstInput.sendKeys(4);
     await secondInput.sendKeys(5);
     await goBtn.click();
     expect(await latestResult.getText() as any).toEqual('9');
   })

  it('should add negative integers correctly', async ()=>{
    await firstInput.sendKeys(4);
    await secondInput.sendKeys(-2);
    await goBtn.click();
    expect(await latestResult.getText() as any).toEqual('2');
  })

  it('should return NaN for non integers addition', async ()=>{
    await firstInput.sendKeys('aa');
    await secondInput.sendKeys(5);
    await goBtn.click();
    expect(await latestResult.getText() as any).toEqual('NaN');
  });

  it('should return NaN for adding empty values', async ()=>{
    await goBtn.click();
    expect(await latestResult.getText() as any).toEqual('NaN');
  })

  it('should divide the 6 by 2 correctly', async()=>{
    await firstInput.sendKeys(6);
    await element(by.model('operator')).click();
    await browser.sleep(1000);
    await element(by.css('select [value="DIVISION"]')).click();
    await secondInput.sendKeys(2);
    await goBtn.click();
    expect(await latestResult.getText() as any).toEqual('3');
  })

  it('should divide any integer by Zero to result infinity',async ()=>{
    await firstInput.sendKeys(6);
    await element(by.model('operator')).click();
    await browser.sleep(1000);
    await element(by.css('select [value="DIVISION"]')).click();
    await secondInput.sendKeys(0);
    await goBtn.click();
    expect(await latestResult.getText() as any).toEqual('Infinity');
  })

  it('should divide an integer by other which is not divisible to return a floating value/decimal',async()=>{
    await firstInput.sendKeys(6);
    await element(by.model('operator')).click();
    await browser.sleep(1000);
    await element(by.css('select [value="DIVISION"]')).click();
    await secondInput.sendKeys(4);
    await goBtn.click();
    expect(await latestResult.getText() as any).toEqual('1.5');
  })

  it('should calculate 3 mod 2 correctly', async()=>{
    await firstInput.sendKeys(3);
    await element(by.model('operator')).click();
    await browser.sleep(1000);
    await element(by.css('select [value="MODULO"]')).click();
    await secondInput.sendKeys(2);
    await goBtn.click();
    expect(await latestResult.getText() as any).toEqual('1');
  })

  it('should return mudulo value zero when both inputs are same', async()=>{
    await firstInput.sendKeys(3);
    await element(by.model('operator')).click();
    await browser.sleep(1000);
    await element(by.css('select [value="MODULO"]')).click();
    await secondInput.sendKeys(3);
    await goBtn.click();
    expect(await latestResult.getText() as any).toEqual('0');
  })

  it('should return NaN when modulo operation is done by zero', async()=>{
    await firstInput.sendKeys(3);
    await element(by.model('operator')).click();
    await browser.sleep(1000);
    await element(by.css('select [value="MODULO"]')).click();
    await secondInput.sendKeys(0);
    await goBtn.click();
    expect(await latestResult.getText() as any).toEqual('NaN');
  })

  it('should multiply 2 and 4 correctly', async ()=> {
    await firstInput.sendKeys(2);
    await element(by.model('operator')).click();
    await browser.sleep(1000);
    await element(by.css('select [value="MULTIPLICATION"]')).click();
    await secondInput.sendKeys(4);
    await goBtn.click();
    expect(await latestResult.getText() as any).toEqual('8');
  })

  it('should multiply a positive number with negative number', async ()=>{
    await firstInput.sendKeys(3);
    await element(by.model('operator')).click();
    await browser.sleep(1000);
    await element(by.css('select [value="MULTIPLICATION"]')).click();
    await secondInput.sendKeys(-2)
    await goBtn.click();
    expect(await latestResult.getText() as any).toEqual('-6') ;
  })

  it('should return zero when an integer is multiplied with zero', async ()=>{
    await firstInput.sendKeys(3);
    await element(by.model('operator')).click();
    await browser.sleep(1000);
    await element(by.css('select [value="MULTIPLICATION"]')).click();
    await secondInput.sendKeys(0)
    await goBtn.click();
    expect(await latestResult.getText() as any).toEqual('0') ;
  })

  it('should subtract 2 from 4 correctly', async ()=> {
    await firstInput.sendKeys(4);
    await element(by.model('operator')).click();
    await browser.sleep(1000);
    await element(by.css('select [value="SUBTRACTION"]')).click();
    await secondInput.sendKeys(2);
    await goBtn.click();
    expect(await latestResult.getText() as any).toEqual('2');
  })

  it('should calculate subtraction with negative integers correctly', async ()=> {
    await firstInput.sendKeys(-4);
    await element(by.model('operator')).click();
    await browser.sleep(1000);
    await element(by.css('select [value="SUBTRACTION"]')).click();
    await secondInput.sendKeys(2);
    await goBtn.click();
    expect(await latestResult.getText() as any).toEqual('-6');
  })



  it('should count number of rows for relevant number of results', async ()=>{
    await goBtn.click();
    await goBtn.click();
    expect(await element.all(by.repeater('result in memory')).count()).toEqual(2);
  })

  it('should check latest result is on the top row', async()=>{
    await firstInput.sendKeys(4);
    await secondInput.sendKeys(5);
    await goBtn.click();

    await firstInput.sendKeys(2);
    await secondInput.sendKeys(3);
    await goBtn.click();

    const latestResultValue = await latestResult.getText();
    const latestRowResult = await element.all(by.repeater('result in memory')).get(0).$('td:nth-child(3)').getText();
    expect(latestResultValue).toEqual(latestRowResult);
  })

})
