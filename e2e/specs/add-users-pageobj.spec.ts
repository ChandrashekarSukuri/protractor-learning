import {browser, element, by, protractor} from "protractor";
import {AddUsers} from "./add-users-pageobj";

const waitForElementToBePresent = (elementFinder) => {
  let EC = protractor.ExpectedConditions;
  return browser.wait(EC.presenceOf(elementFinder), 5000);
}


const usersList = [
  {
    userName:'Rohit Sharma',
    designation:'Developer',
    email: 'rohit@test.com',
    age:'34',
    gender:'Male'
  },
  {
    userName:'Daniel Summer',
    designation:'Tester',
    email: 'summer@test.com',
    age:'32',
    gender:'Female'
  },
  {
    userName:'Ricky Ponting',
    designation:'Tester',
    email: 'ponting@test.com',
    age:'30',
    gender:'Male'
  }
]

describe('Add users form',()=>{
  let addUsers:any;
  const until = protractor.ExpectedConditions;
  beforeEach(async ()=>{
    addUsers = new AddUsers();
    await addUsers.getAddUserForm();
  })

  it('should have the form heading Add Users',async ()=>{
    expect(await element(by.id('addUsersHeading')).getText()).toEqual('Add Users');
  })

  it('should enable the add users button for the valid data', async ()=>{
    await addUsers.nameInput.sendKeys(usersList[0].userName);
    await addUsers.emailInput.sendKeys(usersList[0].email);
    await addUsers.openDesignationDropdown();
    await browser.wait(until.presenceOf(await addUsers.getDesignationOptionsByName(usersList[0].designation)),3000,'Developer option not present in the dropdown');
    await element(by.cssContainingText('[role="listbox"] mat-option',usersList[0].designation)).click();
    await addUsers.ageInput.sendKeys(usersList[0].age);
    await element(by.css('[type="radio"][name="gender"][value="'+ usersList[0].gender +'"]')).click();
    expect(await addUsers.addUserBtn.isEnabled()).toBeTruthy();
  })

  it('should add the correct data in the table for valid user data', async ()=>{
    await addUsers.nameInput.sendKeys(usersList[0].userName);
    await addUsers.emailInput.sendKeys(usersList[0].email);
    await addUsers.openDesignationDropdown();
    await browser.wait(until.presenceOf(await addUsers.getDesignationOptionsByName(usersList[0].designation)),3000,'Developer option not present in the dropdown');
    await element(by.cssContainingText('[role="listbox"] mat-option',usersList[0].designation)).click();
    await addUsers.ageInput.sendKeys(usersList[0].age);
    await element(by.css('[type="radio"][name="gender"][value="'+ usersList[0].gender +'"]')).click();
    await browser.wait(addUsers.addUserBtn.isEnabled(),3000);
    await addUsers.addUserBtn.click();
    await waitForElementToBePresent(await element(by.css('table.users-table')));
    expect(await element.all(by.css('table.users-table tbody tr td:first-child')).get(0).getText()).toEqual(usersList[0].userName);
  })

  it('should show the no users added message when the page is loaded', async()=>{
    waitForElementToBePresent(element(by.id('no-data-section')));
    expect(await element(by.id('no-data-section')).getText()).toEqual('No Users Added');
  })

  it('should sort the users data based on the column selected', async ()=>{
    const fillUserDetails = async (userObj:any)=>{
      await addUsers.nameInput.sendKeys(userObj.userName);
      await addUsers.emailInput.sendKeys(userObj.email);
      await addUsers.openDesignationDropdown();
      await browser.wait(until.presenceOf(await addUsers.getDesignationOptionsByName(userObj.designation)),3000,'Developer option not present in the dropdown');
      await element(by.cssContainingText('[role="listbox"] mat-option',userObj.designation)).click();
      await addUsers.ageInput.sendKeys(userObj.age);
      await element(by.css('[type="radio"][name="gender"][value="'+ userObj.gender +'"]')).click();
      await browser.wait(addUsers.addUserBtn.isEnabled(),3000);
      await addUsers.addUserBtn.click();
    }
    await fillUserDetails(usersList[0]);
    await fillUserDetails(usersList[1]);
    await fillUserDetails(usersList[2]);
    await waitForElementToBePresent(await element(by.css('table.users-table')));
    await element(by.css('table.users-table thead tr th:first-child')).click();
    expect(await element.all(by.css('table.users-table tbody tr td:first-child')).get(0).getText()).toEqual(usersList[1].userName);
  })

  it('should show the filter button if there is an user is present', async ()=>{
    expect(await addUsers.filterBtn.isPresent()).toBeFalsy();
    const fillUserDetails = async (userObj:any)=>{
      await addUsers.nameInput.sendKeys(userObj.userName);
      await addUsers.emailInput.sendKeys(userObj.email);
      await addUsers.openDesignationDropdown();
      await browser.wait(until.presenceOf(await addUsers.getDesignationOptionsByName(userObj.designation)),3000,'Developer option not present in the dropdown');
      await element(by.cssContainingText('[role="listbox"] mat-option',userObj.designation)).click();
      await addUsers.ageInput.sendKeys(userObj.age);
      await element(by.css('[type="radio"][name="gender"][value="'+ userObj.gender +'"]')).click();
      await browser.wait(addUsers.addUserBtn.isEnabled(),3000);
      await addUsers.addUserBtn.click();
    }
    await fillUserDetails(usersList[0]);
    expect(await addUsers.filterBtn.isPresent()).toBeTruthy();
  })

  it('should filter the user data correctly when a designation/gender filter is applied', async ()=>{
    const fillUserDetails = async (userObj:any)=>{
      await addUsers.nameInput.sendKeys(userObj.userName);
      await addUsers.emailInput.sendKeys(userObj.email);
      await addUsers.openDesignationDropdown();
      await browser.wait(until.presenceOf(await addUsers.getDesignationOptionsByName(userObj.designation)),3000,'Developer option not present in the dropdown');
      await element(by.cssContainingText('[role="listbox"] mat-option',userObj.designation)).click();
      await addUsers.ageInput.sendKeys(userObj.age);
      await element(by.css('[type="radio"][name="gender"][value="'+ userObj.gender +'"]')).click();
      await browser.wait(addUsers.addUserBtn.isEnabled(),3000);
      await addUsers.addUserBtn.click();
    }
    await fillUserDetails(usersList[0]);
    await fillUserDetails(usersList[1]);
    await fillUserDetails(usersList[2]);
    await waitForElementToBePresent(addUsers.filterBtn);
    await addUsers.filterBtn.click();
    await waitForElementToBePresent(element(by.id('users-filter-dialog')));
    await element(by.css('[type="radio"][name="genderFilter"][value="Male"]')).click();
    await addUsers.submitFilterBtn.click();
    expect(element.all(by.css('table.users-table tbody tr')).count() as any).toEqual(2);
  })



})


