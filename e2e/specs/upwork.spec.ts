import {browser, protractor} from "protractor";
import {UpworkPageObject} from "./upwork-pageObject";

const waitForElementToBePresent = (elementFinder:any) => {
    let EC = protractor.ExpectedConditions;
    return browser.wait(EC.presenceOf(elementFinder), 15000);
}

const waitForTheTextToBePresent = (elementFinder:any,text:string) => {
    let EC = protractor.ExpectedConditions;
    return browser.wait(EC.textToBePresentInElement(elementFinder,text), 15000);
}

const waitForElementToBeVisible = (elementFinder:any) => {
  let EC = protractor.ExpectedConditions;
  return browser.wait(EC.visibilityOf(elementFinder), 15000);
}

const waitForUrlContains = (url:string) => {
    let EC = protractor.ExpectedConditions;
    return browser.wait(EC.urlContains(url), 15000);
}

const waitForElementToBeClickable = (elementFinder:any)=>{
  let EC = protractor.ExpectedConditions;
  return browser.wait(EC.elementToBeClickable(elementFinder),15000);
}

const userInfo = {
    fName:'Rohit',
    lName:'Sharma',
    password:'Rohit@45',
    loginEmail:'chandrasekhar@siraconsultinginc.com',
    loginPassword:'Chandu@sira45',
    loginUserFName:'chandu',
    loginUserLName:'sukuri'
}

const generateRandomEmailAddress = ()=>{
    return (Math.random() + 1).toString(36).substring(7)+'@yopmail.com';
}


describe('Magento Application',()=>{
    let upwork = new UpworkPageObject();
    beforeEach(async ()=>{
        await upwork.getUpworkSite();
    })

    const loginMagento = async ()=>{
      waitForElementToBePresent(upwork.signInButton);
      await upwork.clickLoginLink();
      waitForTheTextToBePresent(upwork.signUpPageHeading,'Customer Login');
      await upwork.loginEmail.sendKeys(userInfo.loginEmail);
      await upwork.loginPassword.sendKeys(userInfo.loginPassword);
      await upwork.clickLoginSubmit();
      waitForUrlContains(upwork.magentoURL);
    }

    const logoutMagento = async()=>{
      await upwork.openCustomerDropdownMenu();
      await waitForElementToBeVisible(upwork.customerMenuDropdown);
      await upwork.signOutBtn.click();
    }

    it('should have Sign In button in header', async () => {
        waitForElementToBePresent(upwork.signInButton);
        expect(await upwork.signInButton.getText()).toEqual('Sign In');
    });

    it('should navigate to signup by clicking on create an Account link', async() => {
        waitForElementToBePresent(upwork.createAccountLink);
        await upwork.clickCreateNewAccountLink();
        waitForTheTextToBePresent(upwork.signUpPageHeading,'Create New Customer Account');
        expect(await browser.getCurrentUrl()).toEqual('https://magento.softwaretestingboard.com/customer/account/create/');
    });

    it('should create an account for valid user details', async() => {
        waitForElementToBePresent(upwork.createAccountLink);
        await upwork.clickCreateNewAccountLink();
        waitForTheTextToBePresent(upwork.signUpPageHeading,'Create New Customer Account');
        await upwork.firstName.sendKeys(userInfo.fName);
        const uniqueEmailAddress = generateRandomEmailAddress();
        await upwork.lastName.sendKeys(userInfo.lName);
        await upwork.emailAddress.sendKeys(uniqueEmailAddress);
        await upwork.password.sendKeys(userInfo.password);
        await upwork.confirmPassword.sendKeys(userInfo.password);
        await upwork.clickCreateNewAccountSubmit();
        waitForTheTextToBePresent(upwork.pageMessagesSection,'Thank you for registering with Main Website Store.');
        expect(await upwork.landingPageAccountInfo.getText()).toContain(uniqueEmailAddress);
        await logoutMagento();
    });

    it('should login into the application for correct user credentials', async() => {
        await loginMagento();
        await upwork.openCustomerDropdownMenu();
        await waitForElementToBeVisible(upwork.customerMenuDropdown);
        await upwork.myAccountBtn.click();
        waitForElementToBePresent(upwork.landingPageAccountInfo);
        expect(await upwork.landingPageAccountInfo.getText()).toContain(userInfo.loginEmail);
        await logoutMagento();
    });

    it('should be able to place an order', async() => {
      await loginMagento();
      await waitForElementToBePresent(upwork.whatsNewLink);
      await upwork.whatsNewLink.click();
      await waitForTheTextToBePresent(upwork.signUpPageHeading,"What's New");
      await upwork.womensHoodiesLink.click();
      await upwork.productItem.click();

      await waitForElementToBePresent(upwork.productInfo);
      await waitForElementToBeClickable(upwork.productSizeM);
      await upwork.productSizeM.click();
      await upwork.productColorFirst.click();
      await upwork.productViewToCartBtn.click();
      await waitForTheTextToBePresent(upwork.productViewToCartBtn,'Add to Cart');
      await waitForElementToBeClickable(upwork.productViewToCartBtn);

      await upwork.showCartBtn.click();
      await waitForElementToBePresent(upwork.cartDialog);
      await waitForElementToBeClickable(upwork.cartDialogCheckoutBtn);
      // await browser.sleep(3000);
      await upwork.cartDialogCheckoutBtn.click();

      await browser.wait(protractor.ExpectedConditions.visibilityOf(upwork.shippingAddressStepView),30000);
      // await browser.sleep(3000);
      const hasExistingAddress =  await upwork.existingShippingAddresses.isPresent();
      if(hasExistingAddress){
        await waitForElementToBeClickable(upwork.shippingNextBtn);
        await upwork.shippingNextBtn.click();
      }else{
        //add shipping address
      }
      await waitForTheTextToBePresent(upwork.paymentMethodStepTitle,'Payment Method');
      await waitForElementToBeClickable(upwork.placeOrderBtn);
      // await browser.sleep(3000);
      await upwork.placeOrderBtn.click();
      await waitForUrlContains('https://magento.softwaretestingboard.com/checkout/onepage/success/');
      await waitForElementToBeVisible(upwork.signUpPageHeading);
      await browser.sleep(3000);
      expect(await upwork.signUpPageHeading.getText()).toEqual('Thank you for your purchase!');
    });


})
