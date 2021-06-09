1. Installing nx CLI, npm install -g nx (https://nx.dev/angular)
2. cd ss-frontend/ss
3. npm install
4. ng s app1

---
Some improvements for put of name:  
For the put to update name.   
Another idea is each time name changes, save to local ngrx store.  
Then have another submit button on the bottom of page to update all name in one go.  
This could give a better UX IMO.  

## Unit test strategy:

## Choice of unit test library and mock:

I will recommend Jest and Jest mock over karma jasmine for following reasons.  
1. Jest is faster than karma since it does not need load any GUI.  
2. Jest can provide snapshot testing which karma does not have.  
3. Better development experience. eg: run one single test can be achieve by it.only much better than karma fdescribe. I have seen many times fdescribe accidentally checked into dev branch which made unit test only test one test in CI/CD pipeline.  
4. Better and powerful mocking.  

I will also recommend cypress to integration test between the components. Cypress is a faster and developer friendly tool.
## A brief description of test cases that should be covered.

Test case:

AddUserComponent:  
1. onAddUser, when given name, it should emit addUser with given name.  
2. onAddUser, when given name, it should reset component.name to null.  

UserListComponent:  
1. onDeleteButtonClick, when given userId, it should emit deleteUser userId with given userId.  
2. onNameChange, when given name and userId, it should emit nameChange with given name and userId.  
3. onOptionChange, when forGroup selectedOption is odd, it should emit optionChange with isOdd true.  
4. onOptionChange, when forGroup selectedOption is even, it should emit optionChange with even false.    

UserContainerComponent:  
1. ngOnInit, it should call dispatch loadUsers().  
2. onDeleteUser, when given userId, it should dispatch deleteUser with given userId.  
3. onAddUser, when given name, it should dispatch createUser with given name.  
4. onNameChange, when given user and userId, it should dispatch updateUser with given user and userId.  
5. onOptionChange, when given isOdd, it should dispatch loadUsersOddOrEven with given isOdd.  

UserService:  
1. getUsers, when given isOdd is null, should call valid getUsers url and return users.    
2. getUsers, when given isOdd, should call valid getUsers url and return odd users.  
3. getUsers, when given isEven, should call valid getUsers url and return even users.  
4. Others are similar.  

NameFilterPipe:  
1. transform, when given users and filter string, should filter uses name with filter string.  

NGRX test (will provide one example for each since they are similar):    
user-api.actions:  
1. usersLoaded, when given users, should create an action with given users and type userLoaded.  

lib/shared/data-acccess/user/+state/index.ts (selector): (ngrx projector function can be good candidate to unit test selectors https://ngrx.io/guide/store/testing)  
1. getUsers, when given empty users, should return empty array.  
2. getUsers, when given users, should return given users.  

user.reducer.ts:  
1. userReducer, given undefined action, should return initial State.  
2. userReducer, given UserApiActions.usersLoaded with payload users, should populate uses to store.  

user.effect.ts:  (marble testing can be good candidate to test effects)  
1. loadUsers$, when success, should return UserApiActions.usersLoaded action with users.  
2. loadUsers$, when failed, should return UserApiActions.usersLoadedFail action with errors.  
