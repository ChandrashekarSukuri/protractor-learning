import {browser, protractor} from "protractor";

export class WaitUtility{
  EC = protractor.ExpectedConditions;
  waitForElementToBePresent = (elementFinder:any) => {
    return browser.wait(this.EC.presenceOf(elementFinder), 15000);
  }

  waitForTheTextToBePresent = (elementFinder:any,text:string) => {
    return browser.wait(this.EC.textToBePresentInElement(elementFinder,text), 15000);
  }

  waitForElementToBeVisible = (elementFinder:any) => {
    return browser.wait(this.EC.visibilityOf(elementFinder), 15000);
  }

  waitForUrlContains = (url:string) => {
    return browser.wait(this.EC.urlContains(url), 15000);
  }

  waitForElementToBeClickable = (elementFinder:any)=>{
    return browser.wait(this.EC.elementToBeClickable(elementFinder),15000);
  }

  waitForElementToStale = (elementFinder:any)=>{
    return browser.wait(this.EC.stalenessOf(elementFinder),15000);
  }

  waitForElementToBeInvisible = (elementFinder:any)=>{
    return browser.wait(this.EC.invisibilityOf(elementFinder),15000);
  }
}
