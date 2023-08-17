import {browser,by,element} from "protractor";

export class AngularHomePage{
    public  tryAngularBtn = element(by.css('div.homepage-container a[href="quick-start"]'));
    public  footerLinks = element.all(by.css('.footer-block ul li'));

    public getHome = async()=>{
        await browser.get('https://angular.io/');
    }
    clickTryAngular = async()=>{
        await this.tryAngularBtn.click();
    }

    clickOnResourceListingLink = async() =>{
        await this.footerLinks.$$('a[href="resources"]').get(0).click();
    }
}
