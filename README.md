# qovery-javascript-client

Get Qovery instance
```javascript
const qovery = new Qovery();

const db = qovery.getDatabaseByName("my-pql");

const host = db.host;
const port = db.port;
const username = db.username;
const password = db.password;
```
