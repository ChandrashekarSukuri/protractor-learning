import {browser,element,by} from "protractor";
import {WaitUtility} from "../utility/wait-utility";

export class MagentoPageObject {
  waitUtil = new WaitUtility();
  public magentoURL = 'https://magento.softwaretestingboard.com/';
  public signInButton = element.all(by.cssContainingText('.page-header .panel.header ul.header.links li.authorization-link a','Sign In')).get(0);
  public createAccountLink = element(by.cssContainingText('.page-header ul.header.links li a','Create an Account'));
  public signUpPageHeading = element(by.css('#maincontent .page-title-wrapper h1.page-title'));
  public firstName = element(by.id('firstname'));
  public lastName = element(by.id('lastname'));
  public emailAddress = element(by.id('email_address'));
  public password = element(by.id('password'));
  public confirmPassword = element(by.id('password-confirmation'));
  public loginEmail = element(by.css('.login-container #email'));
  public loginPassword = element(by.css('.login-container #pass'));
  public createAccountSubmitBtn = element(by.cssContainingText('.actions-toolbar button.action.submit','Create an Account'));
  public loginSubmitBtn = element(by.cssContainingText('.actions-toolbar button.action.login','Sign In'));
  public landingPageAccountInfo = element(by.css('.block.block-dashboard-info .box-content'));
  public pageMessagesSection = element.all(by.css('.page.messages [role="alert"]')).get(0);
  public welcomeUserMessage = element(by.css('.page-header ul.header.links li.greet.welcome span.logged-in'));
  public customerMenuDropdownIcon = element(by.css('.page-header button[data-action="customer-menu-toggle"]'));
  public customerMenuDropdown = element(by.css('.page-header .customer-menu'));
  public signOutBtn = element(by.css('.page-header .customer-menu li.authorization-link a'));
  public myAccountBtn = element(by.css('.page-header .customer-menu li:nth-child(1) a'));
  public myAccountSidebar = element(by.css('.sidebar.sidebar-main'));
  public addressBookLink = element(by.cssContainingText('.sidebar.sidebar-main .nav.item','Address Book'));
  public myOrdersLink = element(by.cssContainingText('.sidebar.sidebar-main .nav.item','My Orders'));
  public whatsNewLink = element(by.cssContainingText('.section-item-content ul li.category-item.first a',"What's New"));
  public womensHoodiesLink = element.all(by.cssContainingText('.columns .sidebar .categories-menu li:first-child a','Hoodies & Sweatshirts')).get(0);
  public productItem = element(by.css('.products .list li:first-child'));
  public productItem2 = element(by.css('.products .list li:nth-child(2)'));
  public productViewToCartBtn = element(by.css('.product-options-bottom button.tocart'));
  public productSizeSection = element(by.css('#product-options-wrapper .swatch-attribute.size'));
  public productSizeM  = element(by.css('#product-options-wrapper .swatch-attribute.size .swatch-option:first-child'));
  public productColorFirst  = element(by.css('#product-options-wrapper .swatch-attribute.color .swatch-option:first-child'));
  public existingShippingAddresses = element(by.css('.shipping-address-items .shipping-address-item.selected-item'));
  public shippingNextBtn = element(by.css('#checkout-step-shipping_method #co-shipping-method-form button.continue'));
  public productInfo = element(by.css('.page-title-wrapper.product'));
  public showCartBtn = element(by.css('a.action.showcart'));
  public cartDialog = element(by.css('.ui-dialog #minicart-content-wrapper'));
  public cartDialogCheckoutBtn = element(by.css('.ui-dialog #minicart-content-wrapper #top-cart-btn-checkout'));
  public shippingAddressStepView = element(by.css('#checkoutSteps .checkout-shipping-address #checkout-step-shipping'));
  public shippingMethodsView = element(by.css('#checkoutSteps .checkout-shipping-method #checkout-shipping-method-load'));
  public shippingAddressStepTitle = element(by.css('#checkoutSteps .checkout-shipping-address .step-title'));
  public paymentMethodStepTitle = element(by.css('#checkoutSteps .checkout-payment-method .step-title'));
  public placeOrderBtn = element(by.css('#payment #co-payment-form button.checkout'));
  public addToWishListLink = element(by.css('.product-addto-links a.towishlist'));
  public wishlistedProductsSection = element.all(by.css('.products-grid.wishlist'));
  public wishlistedProducts = element.all(by.css('.products-grid.wishlist .price-box.price-final_price'));
  public wishlistedProductLinks = element.all(by.css('.products-grid.wishlist .product-item-info a.product-item-photo'));
  public loadingSpinner = element(by.css('.loading-mask'));
  public checkOutProgressBar = element(by.css('#checkout .opc-progress-bar'));
  public checkOutAddressLoadingSpinner = element(by.css('#checkout-loader'));
  public billingAddressDetails = element(by.css('.billing-address-details'));
  public addNewAddressBtn = element(by.css('button[role="add-address"]'));
  public editAddressForm = element(by.css('.form-address-edit'));

  public company = element(by.name('company'));
  public telephone = element(by.name('telephone'));
  public addressStreet1 = element(by.id('street_1'));
  public city = element(by.name('city'));
  public countrySelect = element(by.name('country_id'));
  public countrySelectIndiaOption = element(by.css('select#country option[value="IN"]'));
  public stateSelect = element(by.name('region_id'));
  public stateSelectTelanganaOption = element(by.css('select#region_id option[value="564"]'));
  public postcode = element(by.name('postcode'));
  public defaultBillingCheckbox = element(by.name('default_billing'));
  public defaultShippingCheckbox = element(by.name('default_shipping'));
  public addNewAddressSubmit = element(by.css('.form-address-edit .actions-toolbar button.save'));

  public addToCartFromWishlistBtn = element(by.css('#wishlist-view-form .actions-toolbar button.tocart'));
  public wishListEmptyMessage = element(by.css('#wishlist-view-form .message.info'));
  public viewCartBtn = element(by.css('#minicart-content-wrapper .actions a.viewcart'));

  public shoppingCartTable = element(by.id('shopping-cart-table'));
  public inCartProductLinks = element.all(by.css('.cart.item a.product-item-photo'));
  public cartProductCount = element(by.css('a.action.showcart .counter.qty'));
  public inCartFirstProductDelete = element.all(by.css('#shopping-cart-table .item-actions a.action-delete')).get(0);

  public sortSelect = element.all(by.id('sorter')).get(0);
  public sortByNameOption = element.all(by.css('#sorter option[value="name"]')).get(0);
  public sortSwitch = element.all(by.css('a.sorter-action[data-role="direction-switcher')).get(0);
  public productsNamesLinks = element.all(by.css('.product-item-name a.product-item-link'));
  public newProductsList = element.all(by.css('.products.wrapper.grid.products-grid'));
  public priceFilter = element(by.cssContainingText('.filter-options-item','Price'));
  public productPrices = element.all(by.css('.product-item-details .price-final_price .price-wrapper'));
  public priceFilterOptions = this.priceFilter.element(by.css('.filter-options-content li.item:first-child'));
  public fromPrice = this.priceFilter.element(by.css('.filter-options-content li.item:first-child .price:first-child'));
  public toPrice = this.priceFilter.element(by.css('.filter-options-content li.item:first-child .price:nth-child(2)'));
  public firstAvailablePriceFilter = this.priceFilter.element(by.css('.filter-options-content li.item:first-child'));

  public orderNumberConfirmationLink = element(by.css('a.order-number'));
  public myOrdersTable = element(by.id('my-orders-table'));
  public ordersTableIdsColumns = element.all(by.css('#my-orders-table tbody tr td:first-child'));

  public wishListedFirstItem = element(by.css('.products-grid.wishlist .product-items .product-item:first-child'));
  public wishListedFirstItemDelete = element(by.css('.products-grid.wishlist .product-items .product-item:first-child .product-item-inner .btn-remove'));

  public accountEditURL = 'https://magento.softwaretestingboard.com/customer/account/edit/';
  public magentoLoginURL = 'https://magento.softwaretestingboard.com/customer/account/login/';
  public accountEditBtn = element(by.css('a.action.edit[href="'+this.accountEditURL+'"]'));
  public changePasswordCheckbox = element(by.id('change-password'));
  public currentPassword = element(by.id('current-password'));
  public newPasswordConfirm = element(by.id('password-confirmation'));
  public accountEditSaveBtn = element(by.css('form.form-edit-account button.save'));

  async getMagentoSite(){
    await browser.waitForAngularEnabled(false);
    await browser.get(this.magentoURL);
  }

  async clickCreateNewAccountLink(){
    await this.waitUtil.waitForElementToBePresent(this.createAccountLink);
    return this.createAccountLink.click();
  }

  async clickLoginLink(){
    await this.waitUtil.waitForElementToBePresent(this.signInButton);
    return this.signInButton.click();
  }

  async clickCreateNewAccountSubmit(){
    await this.waitUtil.waitForElementToBePresent(this.createAccountSubmitBtn);
    return  this.createAccountSubmitBtn.click();
  }

  async clickLoginSubmit(){
    await this.waitUtil.waitForElementToBePresent(this.loginSubmitBtn);
    return  this.loginSubmitBtn.click();
  }

  async openCustomerDropdownMenu(){
    await this.waitUtil.waitForElementToBePresent(this.customerMenuDropdownIcon);
    return this.customerMenuDropdownIcon.click();
  }

  getProductId(){
    return element(by.css('.product-info-main .product-info-price .price-box.price-final_price')).getAttribute('data-product-id');
  }

  getWhishlistedProductLinks(){
    return this.wishlistedProductLinks.map((ele)=>ele.getAttribute('href').then((val)=>val.split('?')[0]));
  }

  getProductLinksInCart(){
    return this.inCartProductLinks.map((ele)=>ele.getAttribute('href'));
  }

  async getNewProductsNames(){
    return this.productsNamesLinks.map(async (ele)=> await ele.getText());
  }

  async getNewProductPrices(){
    return this.productPrices.map(ele => ele.getText());
  }

  async getOrderIds(){
    return this.ordersTableIdsColumns.map(ele => ele.getText());
  }

  async clickAddToWishListLink(){
    await this.waitUtil.waitForElementToBePresent(this.addToWishListLink);
    return  this.addToWishListLink.click();
  }
}
