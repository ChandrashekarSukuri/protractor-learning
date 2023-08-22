import {browser} from "protractor";
import {MagentoPageObject} from "../page-objects/magento-pageObject";
import {WaitUtility} from "../utility/wait-utility";

const userInfo = {
  fName:'Rohit',
  lName:'Sharma',
  password:'Rohit@45',
  loginEmail:'chandrasekhar@siraconsultinginc.com',
  loginPassword:'Chandu@sira45',
  loginPasswordChange:'Chandu@sira54',
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
  let waitUtil = new WaitUtility();
  let orderId = null;
  beforeEach(async ()=>{
    await magento.getMagentoSite();
  })

  const loginMagento = async ()=>{
    await magento.clickLoginLink();
    await waitUtil.waitForTheTextToBePresent(magento.signUpPageHeading,'Customer Login');
    await magento.loginEmail.sendKeys(userInfo.loginEmail);
    await magento.loginPassword.sendKeys(userInfo.loginPassword);
    await magento.clickLoginSubmit();
    await waitUtil.waitForUrlContains(magento.magentoURL);
  }

  const logoutMagento = async()=>{
    await magento.openCustomerDropdownMenu();
    await waitUtil.waitForElementToBeVisible(magento.customerMenuDropdown);
    await magento.signOutBtn.click();
  }

  const goToWomenHoodiesInWhatsNew = async ()=>{
    await waitUtil.waitForElementToBePresent(magento.whatsNewLink);
    await magento.whatsNewLink.click();
    await waitUtil.waitForTheTextToBePresent(magento.signUpPageHeading,"What's New");
    await magento.womensHoodiesLink.click();
  }

  const selectAProduct = async()=>{
    await magento.productItem.click();
    await selectProductAsthetics();
  }

  const selectProductAsthetics = async()=>{
    await waitUtil.waitForElementToBePresent(magento.productInfo);
    await waitUtil.waitForElementToBeClickable(magento.productSizeM);
    await magento.productSizeM.click();
    await magento.productColorFirst.click();
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

  const wishlistAnItem = async (item:any)=>{
      await goToWomenHoodiesInWhatsNew();
      await item.click();
      await selectProductAsthetics();
      await magento.clickAddToWishListLink();
      await waitUtil.waitForTheTextToBePresent(magento.signUpPageHeading,'My Wish List');
  }

  const addAnItemtoCart = async(item:any)=>{
      await goToWomenHoodiesInWhatsNew();
      await item.click();
      await selectProductAsthetics();
      await magento.productViewToCartBtn.click();

      await waitUtil.waitForTheTextToBePresent(magento.productViewToCartBtn,'Add to Cart');
      await waitUtil.waitForElementToBeClickable(magento.productViewToCartBtn);
      await waitUtil.waitForElementToBeInvisible(magento.loadingSpinner);
  }

  const goToCart = async ()=>{
    await waitUtil.waitForTheTextToBePresent(magento.productViewToCartBtn,'Add to Cart');
    await waitUtil.waitForElementToBeClickable(magento.productViewToCartBtn);
    await waitUtil.waitForElementToBeInvisible(magento.loadingSpinner);
    await clickOnCartBtn();
    await waitUtil.waitForElementToBeClickable(magento.cartDialogCheckoutBtn);
    await magento.cartDialogCheckoutBtn.click();
  }

  const clickOnCartBtn = async()=>{
    const counter = await magento.cartProductCount.getText();
    await browser.wait(async ()=>{ return Number.isNaN(parseInt(counter)) == false});
    await waitUtil.waitForElementToBeVisible(magento.showCartBtn);
    await magento.showCartBtn.click();
    await waitUtil.waitForElementToBePresent(magento.cartDialog);
  }


  it('should have Sign In button in header', async () => {
    await waitUtil.waitForElementToBePresent(magento.signInButton);
    expect(await magento.signInButton.getText()).toEqual('Sign In');
  });

  it('should navigate to signup by clicking on create an Account link', async() => {
    await magento.clickCreateNewAccountLink();
    await waitUtil.waitForTheTextToBePresent(magento.signUpPageHeading,'Create New Customer Account');
    expect(await browser.getCurrentUrl()).toEqual('https://magento.softwaretestingboard.com/customer/account/create/');
  });

  it('should create an account for valid user details', async() => {
    await magento.clickCreateNewAccountLink();
    await waitUtil.waitForTheTextToBePresent(magento.signUpPageHeading,'Create New Customer Account');
    await magento.firstName.sendKeys(userInfo.fName);
    const uniqueEmailAddress = generateRandomEmailAddress();
    await magento.lastName.sendKeys(userInfo.lName);
    await magento.emailAddress.sendKeys(uniqueEmailAddress);
    await magento.password.sendKeys(userInfo.password);
    await magento.confirmPassword.sendKeys(userInfo.password);
    await magento.clickCreateNewAccountSubmit();
    await waitUtil.waitForTheTextToBePresent(magento.pageMessagesSection,'Thank you for registering with Main Website Store.');
    expect(await magento.landingPageAccountInfo.getText()).toContain(uniqueEmailAddress);
    await logoutMagento();
  });

  it('should login into the application for correct user credentials', async() => {
    await loginMagento();
    await magento.openCustomerDropdownMenu();
    await waitUtil.waitForElementToBeVisible(magento.customerMenuDropdown);
    await magento.myAccountBtn.click();
    await waitUtil.waitForElementToBePresent(magento.landingPageAccountInfo);
    expect(await magento.landingPageAccountInfo.getText()).toContain(userInfo.loginEmail);
    await logoutMagento();
  });


  it('should be able view the products', async() => {
    await loginMagento();
    await goToWomenHoodiesInWhatsNew();
    await magento.productItem.click();
    await waitUtil.waitForElementToBePresent(magento.productInfo);
    expect(await magento.productInfo.isPresent()).toBeTruthy();
    await logoutMagento();
  });

  it('should be able wishlist a product', async() => {
    await loginMagento();
    await goToWomenHoodiesInWhatsNew();
    await selectAProduct();

    const productId = await magento.getProductId();
    await magento.clickAddToWishListLink();
    await waitUtil.waitForTheTextToBePresent(magento.signUpPageHeading,'My Wish List');
    const wishListedIds = await magento.wishlistedProducts.map((ele:any)=>ele.getAttribute('data-product-id'));
    expect(wishListedIds).toContain(productId);
    await logoutMagento();
  });

  it('should be able to place an order', async() => {
    await loginMagento();

    // Add a product to cart
    await goToWomenHoodiesInWhatsNew();
    await selectAProduct();
    await magento.productViewToCartBtn.click();

    //Go to cart
    await goToCart()

    // Select/Add shipping address
    await waitUtil.waitForElementToBePresent(magento.checkOutProgressBar);
    await waitUtil.waitForElementToBePresent(magento.shippingAddressStepView);
    await waitUtil.waitForElementToStale(magento.checkOutAddressLoadingSpinner);
    try {
      await waitUtil.waitForElementToBeVisible(magento.existingShippingAddresses);
      const hasExistingAddress =  await magento.existingShippingAddresses.isPresent();
      if(hasExistingAddress){
        await waitUtil.waitForElementToBePresent(magento.shippingMethodsView);
        await waitUtil.waitForElementToBePresent(magento.shippingNextBtn);
        await magento.shippingNextBtn.click();
      }
    }catch (e) {
      console.log('no existing addresses');
    }

    // Select/Add billing address
    await waitUtil.waitForTheTextToBePresent(magento.paymentMethodStepTitle,'Payment Method');
    await waitUtil.waitForElementToBePresent(magento.billingAddressDetails);
    await waitUtil.waitForElementToBeInvisible(magento.loadingSpinner);

    // place order
    await waitUtil.waitForElementToBeClickable(magento.placeOrderBtn);
    await magento.placeOrderBtn.click();

    // Validate order success message
    await waitUtil.waitForUrlContains('https://magento.softwaretestingboard.com/checkout/onepage/success/');
    await waitUtil.waitForElementToBeInvisible(magento.loadingSpinner);
    await waitUtil.waitForElementToBeVisible(magento.signUpPageHeading);
    expect(await magento.signUpPageHeading.getText()).toEqual('Thank you for your purchase!');
    await waitUtil.waitForElementToBePresent(magento.orderNumberConfirmationLink);
    orderId = await magento.orderNumberConfirmationLink.getText();
    await logoutMagento();
  });


  it('should be able to add an address to the address book', async() => {
    await loginMagento();
    await magento.openCustomerDropdownMenu();
    await waitUtil.waitForElementToBeVisible(magento.customerMenuDropdown);
    await magento.myAccountBtn.click();
    await waitUtil.waitForElementToBeVisible(magento.myAccountSidebar);
    await magento.addressBookLink.click();
    const addressBookHeading = await magento.signUpPageHeading.getText();
    if(addressBookHeading == 'Address Book'){
      await magento.addNewAddressBtn.click();
      await waitUtil.waitForElementToBePresent(magento.editAddressForm);
      await addNewAddress();
      await magento.defaultBillingCheckbox.click();
      await magento.defaultShippingCheckbox.click();
      await magento.addNewAddressSubmit.click();
    }else{
      await waitUtil.waitForElementToBePresent(magento.editAddressForm);
      await addNewAddress();
      await magento.addNewAddressSubmit.click();
    }
    await waitUtil.waitForUrlContains('https://magento.softwaretestingboard.com/customer/address/index/');
    await waitUtil.waitForElementToBePresent(magento.pageMessagesSection);
    expect(await magento.pageMessagesSection.getText()).toEqual('You saved the address.');
  });


  it('should be able to move products from wishlist to cart', async() => {
    await loginMagento();
    await goToWomenHoodiesInWhatsNew();
    await selectAProduct();

    await magento.clickAddToWishListLink();
    await waitUtil.waitForTheTextToBePresent(magento.signUpPageHeading,'My Wish List');
    const wishListedLinks = await magento.getWhishlistedProductLinks();
    await magento.addToCartFromWishlistBtn.click();
    await waitUtil.waitForTheTextToBePresent(magento.wishListEmptyMessage,'You have no items in your wish list.');
    await clickOnCartBtn();
    await waitUtil.waitForElementToBeClickable(magento.viewCartBtn);
    await magento.viewCartBtn.click();

    await waitUtil.waitForUrlContains('https://magento.softwaretestingboard.com/checkout/cart/');
    await waitUtil.waitForTheTextToBePresent(magento.signUpPageHeading,'Shopping Cart');
    const inCartProductLinks = await magento.getProductLinksInCart();
    expect(inCartProductLinks.join(',')).toContain(wishListedLinks.join(','));
    await logoutMagento();
  });

  it('should be able to apply the sort by product name', async () => {
    await loginMagento();
    await goToWomenHoodiesInWhatsNew();
    await waitUtil.waitForElementToBePresent(magento.sortSelect);
    await magento.sortSelect.click();
    await magento.sortByNameOption.click();
    await waitUtil.waitForUrlContains('?product_list_order=name');
    await waitUtil.waitForElementToBePresent(magento.newProductsList);
    await magento.sortSwitch.click();
    await waitUtil.waitForUrlContains('?product_list_order=name&product_list_dir=desc');
    await waitUtil.waitForElementToBePresent(magento.newProductsList);
    const productsNames = Array.from(new Set(await magento.getNewProductsNames()));
    const productNamesSorted = [...productsNames].sort((a:string,b:string)=> a.toLowerCase() < b.toLowerCase() ? -1 : 1 ).reverse();
    expect(productsNames).toEqual(productNamesSorted);
    await logoutMagento();
  });

  it('should able to filter the products by price', async() => {
    await loginMagento();
    await goToWomenHoodiesInWhatsNew();

    await waitUtil.waitForElementToBePresent(magento.priceFilter);
    await magento.priceFilter.click();
    await waitUtil.waitForElementToBePresent(magento.priceFilterOptions);
    const fromPriceStr = await magento.fromPrice.getText();
    const fromPrice = parseFloat(fromPriceStr.substring(1,fromPriceStr.length-1));
    const toPriceStr = await magento.toPrice.getText();
    const toPrice = parseFloat(toPriceStr.substring(1,toPriceStr.length-1));
    await magento.firstAvailablePriceFilter.click();
    const productPricesStr = await magento.getNewProductPrices();
    const productPrices = productPricesStr.map((price:any)=>parseFloat(price.substring(1,price.length-1)));
    const filteredProductPrices = productPrices.filter((price)=> (fromPrice <= price) && (price <= toPrice));
    expect(productPrices).toEqual(filteredProductPrices);
  });

  it('should be able to view previous orders', async () => {
    await loginMagento();
    await magento.openCustomerDropdownMenu();
    await waitUtil.waitForElementToBeVisible(magento.customerMenuDropdown);
    await magento.myAccountBtn.click();
    await waitUtil.waitForElementToBeVisible(magento.myAccountSidebar);
    await magento.myOrdersLink.click();
    await waitUtil.waitForTheTextToBePresent(magento.signUpPageHeading,'My Orders');
    const orderIds = await magento.getOrderIds();
    expect(orderIds).toContain(orderId);
  });



  it('should be able to remove items from the wishlist', async () => {
    await loginMagento();
    await wishlistAnItem(magento.productItem);
    await wishlistAnItem(magento.productItem2);
    const wishListedLinks = await magento.getWhishlistedProductLinks();
    await browser.actions().mouseMove(magento.wishListedFirstItem).perform();
    await waitUtil.waitForElementToBePresent(magento.wishListedFirstItemDelete);
    await magento.wishListedFirstItemDelete.click();
    await waitUtil.waitForTheTextToBePresent(magento.signUpPageHeading,'My Wish List');
    await waitUtil.waitForElementToBePresent(magento.wishlistedProductsSection);
    const wishListedLinks2 = await magento.getWhishlistedProductLinks();
    expect(wishListedLinks2).not.toContain(wishListedLinks[0]);
    await logoutMagento();
  });



  it('should be able to remove items from the cart', async () => {
    await loginMagento();
    await addAnItemtoCart(magento.productItem);
    await addAnItemtoCart(magento.productItem2);
    await clickOnCartBtn();
    await waitUtil.waitForElementToBeClickable(magento.viewCartBtn);
    await magento.viewCartBtn.click();

    await waitUtil.waitForUrlContains('https://magento.softwaretestingboard.com/checkout/cart/');
    await waitUtil.waitForTheTextToBePresent(magento.signUpPageHeading,'Shopping Cart');
    await waitUtil.waitForElementToBePresent(magento.shoppingCartTable);
    const inCartProductLinks = await magento.getProductLinksInCart();

    await magento.inCartFirstProductDelete.click();
    await waitUtil.waitForTheTextToBePresent(magento.signUpPageHeading,'Shopping Cart');
    await waitUtil.waitForElementToBePresent(magento.shoppingCartTable);
    const inCartProductLinksModified = await magento.getProductLinksInCart();

    expect(inCartProductLinksModified).not.toContain(inCartProductLinks[0]);
    await logoutMagento();
  });

  it('should be able to update the account password', async () => {
    const goToAccountInfoEdit = async()=>{
      await waitUtil.waitForTheTextToBePresent(magento.signUpPageHeading,'My Account');
      await waitUtil.waitForElementToBePresent(magento.accountEditBtn);
      await magento.accountEditBtn.click();
      await waitUtil.waitForUrlContains(magento.accountEditURL);
      await waitUtil.waitForTheTextToBePresent(magento.signUpPageHeading,'Edit Account Information');
    }
    await loginMagento();
    await magento.openCustomerDropdownMenu();
    await waitUtil.waitForElementToBeVisible(magento.customerMenuDropdown);
    await magento.myAccountBtn.click();
    await waitUtil.waitForElementToBeVisible(magento.myAccountSidebar);
    await goToAccountInfoEdit();
    await magento.changePasswordCheckbox.click();
    await magento.currentPassword.sendKeys(userInfo.loginPassword);
    await magento.password.sendKeys(userInfo.loginPasswordChange);
    await magento.newPasswordConfirm.sendKeys(userInfo.loginPasswordChange);
    await magento.accountEditSaveBtn.click();

    await waitUtil.waitForUrlContains(magento.magentoLoginURL);
    await waitUtil.waitForTheTextToBePresent(magento.signUpPageHeading,'Customer Login');
    await magento.loginEmail.sendKeys(userInfo.loginEmail);
    await magento.loginPassword.sendKeys(userInfo.loginPasswordChange);
    await magento.clickLoginSubmit();
    await waitUtil.waitForUrlContains('https://magento.softwaretestingboard.com/customer/account/');

    await goToAccountInfoEdit();
    await magento.changePasswordCheckbox.click();
    await magento.currentPassword.sendKeys(userInfo.loginPasswordChange);
    await magento.password.sendKeys(userInfo.loginPassword);
    await magento.newPasswordConfirm.sendKeys(userInfo.loginPassword);
    await magento.accountEditSaveBtn.click();

    await magento.loginEmail.sendKeys(userInfo.loginEmail);
    await magento.loginPassword.sendKeys(userInfo.loginPassword);
    await magento.clickLoginSubmit();

    await waitUtil.waitForTheTextToBePresent(magento.signUpPageHeading,'My Account');
    await logoutMagento();
  });


})
