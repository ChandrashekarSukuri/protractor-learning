import {browser,element,by} from "protractor";

export class AddUsers{
  public nameInput = element(by.name('userName'));
  public emailInput = element(by.name('email'));
  public designationSelect = element(by.name('designation'));
  public ageInput = element(by.name('age'));
  public genderRadioSelect = element(by.name('gender'));
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

  async getAddUserForm(){
    await browser.get('http://localhost:4200/');
  }
  async submitUser(){
    await this.addUserBtn.click();
  }

  getheadingText(){
    return element(by.id('addUsersHeading')).getText();
  }
  getGenderFiltersOptionByName(name:string){
    return element(by.css('[type="radio"][name="genderFilter"][value="'+name+'"]'));
  }

  async clickGenderFiltersOptionByName(name:string){
    await element(by.css('[type="radio"][name="genderFilter"][value="'+name+'"]')).click();
  }

  async clickGenderOptionByName(name:string){
    await element(by.css('[type="radio"][name="gender"][value="'+name+'"]')).click();
  }

  getDesignationOptionsByName(name:string){
    return  element(by.cssContainingText('[role="listbox"] mat-option.designation-option',name));
  }

  getDesignationFilterOptionsByName(name:string){
    return element(by.cssContainingText('[role="listbox"] mat-option.designation-filter-option',name));
  }
  async clickDesignationOptionsByName(name:string){
    return element(by.cssContainingText('[role="listbox"] mat-option.designation-option',name)).click();
  }

  async clickDesignationFilterOptionsByName(name:string){
    return element(by.cssContainingText('[role="listbox"] mat-option.designation-filter-option',name)).click();
  }

  getGenderOptionByName(name:string){
    return element(by.css('[type="radio"][name="gender"][value="'+ name +'"]'));
  }

  async openDesignationDropdown(){
    await this.designationSelect.click();
  }

  async openDesignationFilterDropdown(){
    await this.designationSelectFilter.click();
  }


}
