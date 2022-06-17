# b24-async - Async wrapper for BX24 API library

## Install

```
npm install @ranx-ru/b24-async
```

Requires script of BX24 API library. Include it where you need:
```
<script src="//api.bitrix24.com/api/v1/"></script>
```

## Usage

```
import B24 from '@ranx-ru/b24-async'

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
callBind
callUnbind
appOptionGet
appOptionSet
userOptionGet
userOptionSet
call - async wrapper for BX24.callMethod()
batch - async wrapper for BX24.callBatch()
selectUser
rxFixScroll - fix for scrolls problem
sendMessage - communication with parent frame
```
