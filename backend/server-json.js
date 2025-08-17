// // // const jsonServer = require('json-server');
// // import { createRequire } from 'module';
// // const require = createRequire(import.meta.url);
// // const jsonServer = require('json-server');
//  // "type": "module"

// // import { create, router as _router, defaults } from 'json-server';
// // const server = create()
// // const router = _router('src/data/posts.json'); // Your database file
// // const middlewares = defaults();

// const jsonServer = require('json-server');
// const server = jsonServer.create()
// const router = jsonServer.router('src/data/posts.json'); // Your database file
// const middlewares = jsonServer.defaults();

// server.use(middlewares);


// // // Add custom middleware for CORS
// // server.use((req, res, next) => {
// //   res.header('Access-Control-Allow-Origin', '*'); // Allow any origin
// //   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
// //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
// //   next();
// // });

// server.use(router);
// server.listen(3600, () => {
//   console.log('JSON Server is running');
// });