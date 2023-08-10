import {browser, protractor} from "protractor";
import {MagentoPageObject} from "./magento-pageObject";

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

const waitForElementToStale = (elementFinder:any)=>{
  let EC = protractor.ExpectedConditions;
  return browser.wait(EC.stalenessOf(elementFinder),15000);
}

const waitForElementToBeInvisible = (elementFinder:any)=>{
  let EC = protractor.ExpectedConditions;
  return browser.wait(EC.invisibilityOf(elementFinder),15000);
}

const userInfo = {
    fName:'Rohit',
    lName:'Sharma',
    password:'Rohit@45',
    loginEmail:'chandrasekhar@siraconsultinginc.com',
    loginPassword:'Chandu@sira45',
    loginUserFName:'chandu',
    loginUserLName:'sukuri',
    address:{
      company:'Sira Asia',
      phone:'7894561230',
      street1:'#203,vasu heights, lumbini avenue',
      city:'Hyderabad',
      zipCode:'500032'
    }
}

const generateRandomEmailAddress = ()=>{
    return (Math.random() + 1).toString(36).substring(7)+'@yopmail.com';
}


describe('Magento Application',()=>{
    let magento = new MagentoPageObject();
    beforeEach(async ()=>{
        await magento.getMagentoSite();
    })

    const loginMagento = async ()=>{
      waitForElementToBePresent(magento.signInButton);
      await magento.clickLoginLink();
      waitForTheTextToBePresent(magento.signUpPageHeading,'Customer Login');
      await magento.loginEmail.sendKeys(userInfo.loginEmail);
      await magento.loginPassword.sendKeys(userInfo.loginPassword);
      await magento.clickLoginSubmit();
      waitForUrlContains(magento.magentoURL);
    }

    const logoutMagento = async()=>{
      await magento.openCustomerDropdownMenu();
      await waitForElementToBeVisible(magento.customerMenuDropdown);
      await magento.signOutBtn.click();
    }

    const addNewAddress = async ()=>{
      await magento.firstName.sendKeys(userInfo.fName);
      await magento.lastName.sendKeys(userInfo.lName);
      await magento.company.sendKeys(userInfo.address.company);
      await magento.telephone.sendKeys(userInfo.address.phone);
      await magento.addressStreet1.sendKeys(userInfo.address.street1);
      await magento.city.sendKeys(userInfo.address.city);
      await magento.countrySelect.click();
      await magento.countrySelectIndiaOption.click();
      await magento.stateSelect.click();
      await magento.stateSelectTelanganaOption.click();
      await magento.postcode.sendKeys(userInfo.address.zipCode);
    }

    it('should have Sign In button in header', async () => {
        waitForElementToBePresent(magento.signInButton);
        expect(await magento.signInButton.getText()).toEqual('Sign In');
    });

    it('should navigate to signup by clicking on create an Account link', async() => {
        waitForElementToBePresent(magento.createAccountLink);
        await magento.clickCreateNewAccountLink();
        waitForTheTextToBePresent(magento.signUpPageHeading,'Create New Customer Account');
        expect(await browser.getCurrentUrl()).toEqual('https://magento.softwaretestingboard.com/customer/account/create/');
    });

    it('should create an account for valid user details', async() => {
        waitForElementToBePresent(magento.createAccountLink);
        await magento.clickCreateNewAccountLink();
        waitForTheTextToBePresent(magento.signUpPageHeading,'Create New Customer Account');
        await magento.firstName.sendKeys(userInfo.fName);
        const uniqueEmailAddress = generateRandomEmailAddress();
        await magento.lastName.sendKeys(userInfo.lName);
        await magento.emailAddress.sendKeys(uniqueEmailAddress);
        await magento.password.sendKeys(userInfo.password);
        await magento.confirmPassword.sendKeys(userInfo.password);
        await magento.clickCreateNewAccountSubmit();
        waitForTheTextToBePresent(magento.pageMessagesSection,'Thank you for registering with Main Website Store.');
        expect(await magento.landingPageAccountInfo.getText()).toContain(uniqueEmailAddress);
        await logoutMagento();
    });

    it('should login into the application for correct user credentials', async() => {
        await loginMagento();
        await magento.openCustomerDropdownMenu();
        await waitForElementToBeVisible(magento.customerMenuDropdown);
        await magento.myAccountBtn.click();
        waitForElementToBePresent(magento.landingPageAccountInfo);
        expect(await magento.landingPageAccountInfo.getText()).toContain(userInfo.loginEmail);
        await logoutMagento();
    });


    it('should be able view the products', async() => {
      await loginMagento();
      await waitForElementToBePresent(magento.whatsNewLink);
      await magento.whatsNewLink.click();
      await waitForTheTextToBePresent(magento.signUpPageHeading,"What's New");
      await magento.womensHoodiesLink.click();
      await magento.productItem.click();
      await waitForElementToBePresent(magento.productInfo);
      expect(await magento.productInfo.isPresent()).toBeTruthy();
      await logoutMagento();
    });

    it('should be able wishlist a product', async() => {
      await loginMagento();
      await waitForElementToBePresent(magento.whatsNewLink);
      await magento.whatsNewLink.click();
      await waitForTheTextToBePresent(magento.signUpPageHeading,"What's New");
      await magento.womensHoodiesLink.click();
      await magento.productItem.click();
      await waitForElementToBePresent(magento.productInfo);
      const productId = await magento.getProductId();
      await waitForElementToBePresent(magento.addToWishListLink);
      await magento.addToWishListLink.click();
      await waitForTheTextToBePresent(magento.signUpPageHeading,'My Wish List');
      const wishListedIds = await magento.wishlistedProducts.map((ele:any)=>ele.getAttribute('data-product-id'));
      expect(wishListedIds).toContain(productId);
      await logoutMagento();
    });

    it('should be able to place an order', async() => {
      await loginMagento();
      await waitForElementToBePresent(magento.whatsNewLink);
      await magento.whatsNewLink.click();
      await waitForTheTextToBePresent(magento.signUpPageHeading,"What's New");
      await magento.womensHoodiesLink.click();
      await magento.productItem.click();

      await waitForElementToBePresent(magento.productInfo);
      await waitForElementToBeClickable(magento.productSizeM);
      await magento.productSizeM.click();
      await magento.productColorFirst.click();
      await magento.productViewToCartBtn.click();

      await waitForTheTextToBePresent(magento.productViewToCartBtn,'Add to Cart');
      await waitForElementToBeClickable(magento.productViewToCartBtn);
      await waitForElementToBeInvisible(magento.loadingSpinner);
      browser.sleep(2000);
      await magento.showCartBtn.click();
      await waitForElementToBePresent(magento.cartDialog);
      await waitForElementToBeClickable(magento.cartDialogCheckoutBtn);
      await magento.cartDialogCheckoutBtn.click();

      await waitForElementToBePresent(magento.checkOutProgressBar);
      await waitForElementToBePresent(magento.shippingAddressStepView);
      await waitForElementToStale(magento.checkOutAddressLoadingSpinner);
      try {
        await waitForElementToBeVisible(magento.existingShippingAddresses);
        const hasExistingAddress =  await magento.existingShippingAddresses.isPresent();
        if(hasExistingAddress){
          await waitForElementToBePresent(magento.shippingMethodsView);
          await waitForElementToBePresent(magento.shippingNextBtn);
          await magento.shippingNextBtn.click();
        }
      }catch (e) {
          console.log('no existing addresses');
      }
      await waitForTheTextToBePresent(magento.paymentMethodStepTitle,'Payment Method');
      await waitForElementToBePresent(magento.billingAddressDetails);
      await waitForElementToBeInvisible(magento.loadingSpinner);
      await waitForElementToBeClickable(magento.placeOrderBtn);
      await magento.placeOrderBtn.click();

      await waitForUrlContains('https://magento.softwaretestingboard.com/checkout/onepage/success/');
      await waitForElementToBeInvisible(magento.loadingSpinner);
      await waitForElementToBeVisible(magento.signUpPageHeading);
      expect(await magento.signUpPageHeading.getText()).toEqual('Thank you for your purchase!');
    });


  it('should be able to add an address to the address book', async() => {
    await loginMagento();
    await magento.openCustomerDropdownMenu();
    await waitForElementToBeVisible(magento.customerMenuDropdown);
    await magento.myAccountBtn.click();
    await waitForElementToBeVisible(magento.myAccountSidebar);
    await magento.addressBookLink.click();
    const addressBookHeading = await magento.signUpPageHeading.getText();
    if(addressBookHeading == 'Address Book'){
      await magento.addNewAddressBtn.click();
      await waitForElementToBePresent(magento.editAddressForm);
      await addNewAddress();
      await magento.defaultBillingCheckbox.click();
      await magento.defaultShippingCheckbox.click();
      await magento.addNewAddressSubmit.click();
    }else{
      await waitForElementToBePresent(magento.editAddressForm);
      await addNewAddress();
      await magento.addNewAddressSubmit.click();
    }
    await waitForUrlContains('https://magento.softwaretestingboard.com/customer/address/index/');
    await waitForElementToBePresent(magento.pageMessagesSection);
    expect(await magento.pageMessagesSection.getText()).toEqual('You saved the address.');
  });

})
