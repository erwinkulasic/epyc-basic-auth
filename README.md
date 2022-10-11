
### **epyc-basic-auth**

HTTP basic authentication middelware for epyc. 

Read more about [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication).

<br/>

### **Installation**

Use [npm](https://www.npmjs.com/) or [yarn](https://classic.yarnpkg.com/en/) to install epyc.

```bash
npm i epyc-basic-auth
```

### **Usage**

```javascript
const app = require("epyc");
const isAuthenticated = require('epyc-basic-auth');

app.get('/', 
    isAuthenticated(({ username, password }) => username === 'John' && password === 'Doe') 
    (request, response) => response.send('Hello World')
);

app.bootstrap(8080);
```
<br/>

### **Contributing**
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

<br/>

### **License**
[EPYC_MIT](https://github.com/erwinkulasic/epyc/blob/master/LICENSE)

[AUTH_MIT](https://github.com/erwinkulasic/epyc-basic-auth/blob/master/LICENSE)