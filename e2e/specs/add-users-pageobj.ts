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

  async getAddUserForm(){
    await browser.get('http://localhost:4200/');
  }
  async submitUser(){
    await this.addUserBtn.click();
  }

  async getDesignationOptionsByName(name:string){
    return await element(by.cssContainingText('[role="listbox"] mat-option',name));
  }

  async getGenderOptionByName(name:string){
    return await element(by.css('[type="radio"][name="gender"][value="'+ name +'"]'));
  }

  async openDesignationDropdown(){
    await this.designationSelect.click();
  }




}
