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
  let orderId = null;
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
    await waitForElementToBeClickable(magento.productSizeM);
    await magento.productSizeM.click();
    await magento.productColorFirst.click();

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
    await waitForElementToBePresent(magento.orderNumberConfirmationLink);
    orderId = await magento.orderNumberConfirmationLink.getText();
    await logoutMagento();
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


  it('should be able to move products from wishlist to cart', async() => {
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

    await waitForElementToBePresent(magento.addToWishListLink);
    await magento.addToWishListLink.click();
    await waitForTheTextToBePresent(magento.signUpPageHeading,'My Wish List');
    const wishListedLinks = await magento.getWhishlistedProductLinks();
    await magento.addToCartFromWishlistBtn.click();
    await waitForTheTextToBePresent(magento.wishListEmptyMessage,'You have no items in your wish list.');
    const counter = await magento.cartProductCount.getText();
    await browser.wait(async ()=>{ return Number.isNaN(parseInt(counter)) == false});
    await waitForElementToBeVisible(magento.showCartBtn);
    await magento.showCartBtn.click();
    await waitForElementToBePresent(magento.cartDialog);
    await waitForElementToBeClickable(magento.viewCartBtn);
    await magento.viewCartBtn.click();

    waitForUrlContains('https://magento.softwaretestingboard.com/checkout/cart/');
    waitForTheTextToBePresent(magento.signUpPageHeading,'Shopping Cart');
    const inCartProductLinks = await magento.getProductLinksInCart();
    expect(inCartProductLinks.join(',')).toContain(wishListedLinks.join(','));
    await logoutMagento();
  });

  it('should be able to apply the sort by product name', async () => {
    await loginMagento();
    await waitForElementToBePresent(magento.whatsNewLink);
    await magento.whatsNewLink.click();
    await waitForTheTextToBePresent(magento.signUpPageHeading,"What's New");
    await magento.womensHoodiesLink.click();
    await waitForElementToBePresent(magento.sortSelect);
    await magento.sortSelect.click();
    await magento.sortByNameOption.click();
    await waitForUrlContains('?product_list_order=name');
    await waitForElementToBePresent(magento.newProductsList);
    await magento.sortSwitch.click();
    await waitForUrlContains('?product_list_order=name&product_list_dir=desc');
    await waitForElementToBePresent(magento.newProductsList);
    await waitForElementToBePresent(magento.productsNamesLinks);
    const productsNames = Array.from(new Set(await magento.getNewProductsNames()));
    const productNamesSorted = [...productsNames].sort((a:string,b:string)=> a.toLowerCase() < b.toLowerCase() ? -1 : 1 ).reverse();
    expect(productsNames).toEqual(productNamesSorted);
    await logoutMagento();
  });

  it('should able to filter the products by price', async() => {
    await loginMagento();
    await waitForElementToBePresent(magento.whatsNewLink);
    await magento.whatsNewLink.click();
    await waitForTheTextToBePresent(magento.signUpPageHeading,"What's New");
    await magento.womensHoodiesLink.click();

    await waitForElementToBePresent(magento.priceFilter);
    await magento.priceFilter.click();
    await waitForElementToBePresent(magento.priceFilterOptions);
    const fromPriceStr = await magento.fromPrice.getText();
    const fromPrice = parseFloat(fromPriceStr.substring(1,fromPriceStr.length-1));
    const toPriceStr = await magento.toPrice.getText();
    const toPrice = parseFloat(toPriceStr.substring(1,toPriceStr.length-1));
    await magento.firstAvailablePriceFilter.click();
    await waitForElementToBePresent(magento.newProductsList);
    const productPricesStr = await magento.getNewProductPrices();
    const productPrices = productPricesStr.map((price:any)=>parseFloat(price.substring(1,price.length-1)));
    const filteredProductPrices = productPrices.filter((price)=> (fromPrice <= price) && (price <= toPrice));
    expect(productPrices).toEqual(filteredProductPrices);
  });

  it('should be able to view previous orders', async () => {
    await loginMagento();
    await magento.openCustomerDropdownMenu();
    await waitForElementToBeVisible(magento.customerMenuDropdown);
    await magento.myAccountBtn.click();
    await waitForElementToBeVisible(magento.myAccountSidebar);
    await magento.myOrdersLink.click();
    await waitForTheTextToBePresent(magento.signUpPageHeading,'My Orders');
    await waitForElementToBePresent(magento.myOrdersTable);
    const orderIds = await magento.getOrderIds();
    expect(orderIds).toContain(orderId);
  });

  const wishlistAnItem = async (item:any)=>{
    await waitForElementToBePresent(magento.whatsNewLink);
    await magento.whatsNewLink.click();
    await waitForTheTextToBePresent(magento.signUpPageHeading,"What's New");
    await magento.womensHoodiesLink.click();
    await item.click();
    await waitForElementToBePresent(magento.productInfo);
    await waitForElementToBeClickable(magento.productSizeM);
    await magento.productSizeM.click();
    await magento.productColorFirst.click();

    await waitForElementToBePresent(magento.addToWishListLink);
    await magento.addToWishListLink.click();
    await waitForTheTextToBePresent(magento.signUpPageHeading,'My Wish List');
  }

  it('should be able to remove items from the wishlist', async () => {
    await loginMagento();
    await wishlistAnItem(magento.productItem);
    await wishlistAnItem(magento.productItem2);
    const wishListedLinks = await magento.getWhishlistedProductLinks();
    browser.actions().mouseMove(magento.wishListedFirstItem).perform();
    await waitForElementToBePresent(magento.wishListedFirstItemDelete);
    await magento.wishListedFirstItemDelete.click();
    await waitForTheTextToBePresent(magento.signUpPageHeading,'My Wish List');
    await waitForElementToBePresent(magento.wishlistedProductsSection);
    const wishListedLinks2 = await magento.getWhishlistedProductLinks();
    expect(wishListedLinks2).not.toContain(wishListedLinks[0]);
    await logoutMagento();
  });

  const addAnItemtoCart = async(item:any)=>{
    await waitForElementToBePresent(magento.whatsNewLink);
    await magento.whatsNewLink.click();
    await waitForTheTextToBePresent(magento.signUpPageHeading,"What's New");
    await magento.womensHoodiesLink.click();
    await item.click();

    await waitForElementToBePresent(magento.productInfo);
    await waitForElementToBeClickable(magento.productSizeM);
    await magento.productSizeM.click();
    await magento.productColorFirst.click();
    await magento.productViewToCartBtn.click();

    await waitForTheTextToBePresent(magento.productViewToCartBtn,'Add to Cart');
    await waitForElementToBeClickable(magento.productViewToCartBtn);
    await waitForElementToBeInvisible(magento.loadingSpinner);
  }

  it('should be able to remove items from the cart', async () => {
    await loginMagento();
    await addAnItemtoCart(magento.productItem);
    await addAnItemtoCart(magento.productItem2);
    const counter = await magento.cartProductCount.getText();
    await browser.wait(async ()=>{ return Number.isNaN(parseInt(counter)) == false});
    await waitForElementToBeVisible(magento.showCartBtn);
    await magento.showCartBtn.click();
    await waitForElementToBePresent(magento.cartDialog);
    await waitForElementToBeClickable(magento.viewCartBtn);
    await magento.viewCartBtn.click();

    await waitForUrlContains('https://magento.softwaretestingboard.com/checkout/cart/');
    await waitForTheTextToBePresent(magento.signUpPageHeading,'Shopping Cart');
    await waitForElementToBePresent(magento.shoppingCartTable);
    const inCartProductLinks = await magento.getProductLinksInCart();

    await magento.inCartFirstProductDelete.click();
    await waitForTheTextToBePresent(magento.signUpPageHeading,'Shopping Cart');
    await waitForElementToBePresent(magento.shoppingCartTable);
    const inCartProductLinksModified = await magento.getProductLinksInCart();

    expect(inCartProductLinksModified).not.toContain(inCartProductLinks[0]);
    await logoutMagento();
  });


})
