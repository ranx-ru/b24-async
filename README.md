# b24-async - Async wrapper for BX24 API library

## Install

```
npm install b24-async
```

## Usage

```
import B24 from 'b24-async'

B24.call(
    'user.get',
    {
      sort: 'ID',
      order: 'ASC',
      FILTER: { USER_TYPE: 'employee' }
    }
).then(users => {
  console.log(users); // array of users
);

// OR you can use async/await

const users = await B24.call(
    'user.get',
    {
      sort: 'ID',
      order: 'ASC',
      FILTER: { USER_TYPE: 'employee' }
    }
);
```

## Available methods

```
init - wait for BX24.Init callback
install
installFinish
getAuth
getCurrent - wrapper for profile method
appOptionGet
appOptionSet
userOptionGet
userOptionSet
call - async wrapper for BX24.callMethod()
batch - async wrapper for BX24.callBatch()
selectUser
rxFixScroll - fix for scrolls problem
```
