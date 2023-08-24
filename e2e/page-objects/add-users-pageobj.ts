import {browser,element,by} from "protractor";
import {WaitUtility} from "../utility/wait-utility";

export class AddUsers{
  waitUtil = new WaitUtility();
  public nameInput = element(by.name('userName'));
  public emailInput = element(by.name('email'));
  public designationSelect = element(by.name('designation'));
  public ageInput = element(by.name('age'));
  public addUserBtn = element(by.buttonText('Add User'));
  public filterBtn = element(by.id('filter-users'));
  public submitFilterBtn = element(by.name('filterUser'));
  public clearFiltersBtn = element(by.name('clearFilters'));
  public designationSelectFilter = element(by.name('designationFilter'));
  public usersFilterDialog = element(by.id('users-filter-dialog'));
  public usersTable = element(by.css('table.users-table'));
  public usersTableRowFirstChildren = element.all(by.css('table.users-table tbody tr td:first-child'));
  public usersTableRowSecondColumn = element.all(by.css('table.users-table tbody tr td:nth-child(2)'));
  public usersTableRowThirdColumn = element.all(by.css('table.users-table tbody tr td:nth-child(3)'));
  public usersTableRowFourthColumn = element.all(by.css('table.users-table tbody tr td:nth-child(4)'));
  public usersTableRowFifthColumn = element.all(by.css('table.users-table tbody tr td:nth-child(5)'));

  public usersTableRows = element.all(by.css('table.users-table tbody tr'));
  public noDataSection = element(by.id('no-data-section'));
  public usersTableHeaderFirstcolumn = element(by.css('table.users-table thead tr th:first-child'));
  public usersTableHeaderSecondcolumn = element(by.css('table.users-table thead tr th:nth-child(2)'));

  public addUsersHeading = element(by.id('addUsersHeading'));

  async getAddUserForm(){
    await browser.get('http://localhost:4200/');
  }

  async getHeadingText(){
    await this.waitUtil.waitForAnyTextToBePresent(this.addUsersHeading);
    return this.addUsersHeading.getText();
  }

  async clickGenderFiltersOptionByName(name:string){
    const ele = element(by.css('[type="radio"][name="genderFilter"][value="'+name+'"]'));
    await this.waitUtil.waitForElementToBePresent(ele);
    return ele.click();
  }

  async clickGenderOptionByName(name:string){
    const ele = element(by.css('[type="radio"][name="gender"][value="'+name+'"]'));
    await this.waitUtil.waitForElementToBePresent(ele);
    return ele.click();
  }

  async getDesignationOptionsByName(name:string){
    const ele = element(by.cssContainingText('[role="listbox"] mat-option.designation-option',name));
    await this.waitUtil.waitForTheTextToBePresent(ele,name);
    return ele;
  }

  async getDesignationFilterOptionsByName(name:string){
    const ele= element(by.cssContainingText('[role="listbox"] mat-option.designation-filter-option',name));
    await this.waitUtil.waitForTheTextToBePresent(ele,name);
    return ele;
  }
  async clickDesignationOptionsByName(name:string){
    const ele = await this.getDesignationOptionsByName(name);
    return ele.click();
  }

  async clickDesignationFilterOptionsByName(name:string){
    const ele= await this.getDesignationFilterOptionsByName(name);
    return ele.click();
  }

  async openDesignationDropdown(){
    await this.waitUtil.waitForElementToBePresent(this.designationSelect);
    return this.designationSelect.click();
  }

  async openDesignationFilterDropdown(){
    await this.waitUtil.waitForElementToBePresent(this.designationSelectFilter);
    return this.designationSelectFilter.click();
  }

  async openUsersFilterDialog(){
    await this.waitUtil.waitForElementToBePresent(this.filterBtn);
    await this.filterBtn.click();
    await this.waitUtil.waitForElementToBePresent(this.usersFilterDialog);
  }

}
