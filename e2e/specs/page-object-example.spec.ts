import {browser,by,element} from "protractor";
import {AngularHomePage} from "./page-object-example";

describe('Angular home page',()=>{
    let angularHome:any;
    beforeEach(async ()=>{
        angularHome = new AngularHomePage();
        await angularHome.getHome();
    })

    it('clicking on Try Angular button should navigate to start guide', async ()=>{
        await angularHome.clickTryAngular();
        await browser.waitForAngularEnabled(true);
        expect(await browser.getCurrentUrl() as any).toEqual('https://angular.io/quick-start');
    })

    it('clicking on resource listing footer link should navigate to Explore angular resources page',async ()=>{
        await angularHome.clickOnResourceListingLink();
        await browser.waitForAngularEnabled(true);
        expect(await browser.getCurrentUrl() as any).toEqual('https://angular.io/resources?category=community');
    })

})
