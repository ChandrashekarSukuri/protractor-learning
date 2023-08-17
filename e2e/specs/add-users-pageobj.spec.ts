import {browser} from "protractor";
import {AddUsers} from "../page-objects/add-users-pageobj";
import {WaitUtility} from "../utility/wait-utility";

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
    designation:'HR Manager',
    email: 'ponting@test.com',
    age:'30',
    gender:'Male'
  }
]

describe('Add users form',()=>{
  let addUsers:any;
  const waitUtil = new WaitUtility();
  beforeEach(async ()=>{
    addUsers = new AddUsers();
    await addUsers.getAddUserForm();
    browser.waitForAngularEnabled(true);
  })
  const addAUser = async (userObj:any)=>{
      await fillUserDetails(userObj);
      await browser.wait(addUsers.addUserBtn.isEnabled(),3000);
      await addUsers.addUserBtn.click();
  }

  const fillUserDetails = async (userObj:any)=>{
    await addUsers.nameInput.sendKeys(userObj.userName);
    await addUsers.emailInput.sendKeys(userObj.email);
    await addUsers.openDesignationDropdown();
    await addUsers.clickDesignationOptionsByName(userObj.designation);
    await addUsers.ageInput.sendKeys(userObj.age);
    await addUsers.clickGenderOptionByName(userObj.gender);
  }

  const addThreeUsers = async()=>{
      await addAUser(usersList[0]);
      await addAUser(usersList[1]);
      await addAUser(usersList[2]);
  }

  it('should have the form heading Add Users',async ()=>{
    expect(await addUsers.getHeadingText()).toEqual('Add Users');
  })

  it('should show the no users added message when the page is loaded', async()=>{
    await waitUtil.waitForElementToBePresent(addUsers.noDataSection);
    expect(await addUsers.noDataSection.getText()).toEqual('No Users Added');
  })


  it('should not enable the add users button for invalid data', async ()=>{
    await addUsers.nameInput.sendKeys(usersList[0].userName);
    await addUsers.emailInput.sendKeys(usersList[0].email);
    //Ignoring the remaining fields to fail the form validation
    expect(await addUsers.addUserBtn.isEnabled()).toBeFalsy();
  })

  it('should enable the add users button for the valid data', async ()=>{
    await fillUserDetails(usersList[0]);
    expect(await addUsers.addUserBtn.isEnabled()).toBeTruthy();
  })


  it('should add the correct data in the table for valid user data', async ()=>{
    await fillUserDetails(usersList[0]);
    await browser.wait(addUsers.addUserBtn.isEnabled(),3000);
    await addUsers.addUserBtn.click();
    await waitUtil.waitForElementToBePresent(addUsers.usersTable);
    expect(await addUsers.usersTableRowFirstChildren.get(0).getText()).toEqual(usersList[0].userName);
    expect(await addUsers.usersTableRowSecondColumn.get(0).getText()).toEqual(usersList[0].designation);
    expect(await addUsers.usersTableRowThirdColumn.get(0).getText()).toEqual(usersList[0].email);
    expect(await addUsers.usersTableRowFourthColumn.get(0).getText()).toEqual(usersList[0].age);
    expect(await addUsers.usersTableRowFifthColumn.get(0).getText()).toEqual(usersList[0].gender);

  })


  it('should sort the users data in ascending order by name for one click on Name header', async ()=>{
    await addThreeUsers();
    await waitUtil.waitForElementToBePresent(addUsers.usersTable);
    await addUsers.usersTableHeaderFirstcolumn.click();

    const firstColumnValues = await addUsers.usersTableRowFirstChildren.map((item:any)=> item.getText());
    const expectedFirstColumnValues = usersList.map((user)=> user.userName).sort((a:string,b:string)=> a.toLowerCase() < b.toLowerCase() ? -1 : 1 );

    expect(firstColumnValues.join(',')).toEqual(expectedFirstColumnValues.join(','));
  })

  it('should sort the users data in descending order by designation for 2 clicks on designation header', async ()=>{
    await addAUser(usersList[2]);
    await addAUser(usersList[0]);
    await addAUser(usersList[1]);
    await waitUtil.waitForElementToBePresent(addUsers.usersTable);
    await addUsers.usersTableHeaderSecondcolumn.click();
    await addUsers.usersTableHeaderSecondcolumn.click();

    browser.sleep(1000);
    const secondColumnValues = await addUsers.usersTableRowSecondColumn.map((item:any)=> item.getText());
    const expectedSecondColumnValues = usersList.map((user)=> user.designation).sort((a:string,b:string)=> a.toLowerCase() < b.toLowerCase() ? -1 : 1 ).reverse();
    expect(secondColumnValues.join(',')).toEqual(expectedSecondColumnValues.join(','));
  })

  it('should show the filter button if there is at least one user is present', async ()=>{
    expect(await addUsers.filterBtn.isPresent()).toBeFalsy();
    await addAUser(usersList[0]);
    expect(await addUsers.filterBtn.isPresent()).toBeTruthy();
  })

  it('should filter the user data correctly when gender filter is applied', async ()=>{
    await addThreeUsers();
    await addUsers.openUsersFilterDialog();
    await addUsers.clickGenderFiltersOptionByName('Male');
    await addUsers.submitFilterBtn.click();

    const firstColumnValues = await addUsers.usersTableRowFirstChildren.map((item:any)=> item.getText());
    const expectedColumnValues = usersList.filter((user)=> user.gender == 'Male').map((user)=> user.userName);
    expect(firstColumnValues.join(',')).toEqual(expectedColumnValues.join(','));
  })

  it('should filter the user data correctly when designation filter is applied', async ()=>{
    await addThreeUsers();
    await addUsers.openUsersFilterDialog();

    await addUsers.openDesignationFilterDropdown();
    await addUsers.clickDesignationFilterOptionsByName('Developer');
    await addUsers.submitFilterBtn.click();

    const firstColumnValues = await addUsers.usersTableRowFirstChildren.map((item:any)=> item.getText());
    const expectedColumnValues = usersList.filter((user)=> user.designation == 'Developer').map((user)=> user.userName);
    expect(firstColumnValues.join(',')).toEqual(expectedColumnValues.join(','));
  })

  it('should filter the user data correctly when both designation and gender filter are applied', async ()=>{
    await addThreeUsers();
    await addUsers.openUsersFilterDialog();

    await addUsers.clickGenderFiltersOptionByName('Male');
    await addUsers.openDesignationFilterDropdown();
    await addUsers.clickDesignationFilterOptionsByName('Developer');
    await addUsers.submitFilterBtn.click();

    const names = await addUsers.usersTableRowFirstChildren.map((item:any)=> item.getText());
    expect(await names[0]).toEqual(usersList[0].userName);
  })

  it('should display all the users added after applying the filters, when clicked on clear filters button', async ()=>{
    await addThreeUsers();
    await addUsers.openUsersFilterDialog();
    await addUsers.clickGenderFiltersOptionByName('Male');
    await addUsers.openDesignationFilterDropdown();
    await addUsers.clickDesignationFilterOptionsByName('Developer');
    await addUsers.submitFilterBtn.click();
    expect(await addUsers.usersTableRows.count() as any).toEqual(1);

    await addUsers.openUsersFilterDialog();
    await addUsers.clearFiltersBtn.click();
    expect(await addUsers.usersTableRows.count() as any).toEqual(3);
  })
})


