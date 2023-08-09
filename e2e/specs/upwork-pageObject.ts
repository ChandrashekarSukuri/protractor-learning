import {browser,element,by} from "protractor";

export class UpworkPageObject{
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
  public whatsNewLink = element(by.cssContainingText('.section-item-content ul li.category-item.first a',"What's New"));
  public womensHoodiesLink = element.all(by.cssContainingText('.columns .sidebar .categories-menu li:first-child a','Hoodies & Sweatshirts')).get(0);
  public productItem = element(by.css('.products .list li:first-child'));
  public productViewToCartBtn = element(by.css('.product-options-bottom button.tocart'));
  public productSizeSection = element(by.css('#product-options-wrapper .swatch-attribute.size'));
  public productSizeM  = element(by.css('#product-options-wrapper .swatch-attribute.size .swatch-option:first-child'));
  public productColorFirst  = element(by.css('#product-options-wrapper .swatch-attribute.color .swatch-option:first-child'));
  public existingShippingAddresses = element(by.css('.shipping-address-items'));
  public shippingNextBtn = element(by.css('#checkout-step-shipping_method #co-shipping-method-form button.continue'));
  public productInfo = element(by.css('.page-title-wrapper.product'));
  public showCartBtn = element(by.css('a.action.showcart'));
  public cartDialog = element(by.css('.ui-dialog #minicart-content-wrapper'));
  public cartDialogCheckoutBtn = element(by.css('.ui-dialog #minicart-content-wrapper #top-cart-btn-checkout'));
  public shippingAddressStepView = element(by.css('#checkoutSteps .checkout-shipping-address'));
  public shippingAddressStepTitle = element(by.css('#checkoutSteps .checkout-shipping-address .step-title'));
  public paymentMethodStepTitle = element(by.css('#checkoutSteps .checkout-payment-method .step-title'));
  public placeOrderBtn = element(by.css('#payment #co-payment-form button.checkout'));

  async getUpworkSite(){
    await browser.waitForAngularEnabled(false);
    await browser.get(this.magentoURL);
  }

  async clickCreateNewAccountLink(){
    await this.createAccountLink.click();
  }

  async clickLoginLink(){
    await this.signInButton.click();
  }

  async clickCreateNewAccountSubmit(){
    await this.createAccountSubmitBtn.click();
  }

  async clickLoginSubmit(){
    await this.loginSubmitBtn.click();
  }

  async openCustomerDropdownMenu(){
    await this.customerMenuDropdownIcon.click();
  }
}
