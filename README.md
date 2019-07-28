
# lucas - 07_28_2019

## Installation

### Pre-reqs

* Make sure you have [node](https://nodejs.org/en/download/) installed
* Either [yarn](https://yarnpkg.com/lang/en/docs/install/) or npm should be fine
  * I happened to be using yarn so you'll see a `yarn.lock` file in both projects.

### Running

* clone the repo `git clone git@github.com:lrosa007/lucas-07_28_2019.git`
  * if this gives you trouble try via https `git clone https://github.com/lrosa007/lucas-07_28_2019.git`  
* at this point we need to use two terminal windows

#### API

* `cd lucas-07_28_2019/api`
* `yarn install`
  * `npm i` // if using npm
* `yarn start`
  * `npm start` // if using npm

You should see a message like this:
```
Upload API Running on: http://localhost:4000/ 🚀
```

#### App

* `cd lucas-07_28_2019/web`
* `yarn install`
  * `npm i` // if using npm
* `yarn start`
  * `npm start` // if using npm

##### Tests (app only)

* `yarn install`
  * `npm i` // if using npm
* `yarn test`
  * `npm run test` // if using npm

## Security

### Addressed

Since this is a public API, I put a rate limiter in place to make it harder to DDoS and Brute Force attack the service.
I'm also making use of [helmet](https://github.com/helmetjs/helmet#how-it-works) to cover some common cases.
The size of the document has been limited to 10MB on both the API and frontend. The only Allowed document types
are jpeg and png, limited on both the API and frontend.

### Not Addressed

Currently there probably isn't anything safe about the way data is being stored in this implementation.
Ideally in a production scenario we could make use of a real database to store records and something like S3
to store the document contents.

The rate limiting at the moment could be better. I'm only making use of the simple in-memory driver. The library I'm using
for [rate limiting](https://github.com/animir/node-rate-limiter-flexible) supports a [redis](https://github.com/animir/node-rate-limiter-flexible/wiki/Express-Middleware) driver. I imagine in production, redis would give us better throughput.

I'm only use the default config from `helmet`. There are many more that cover interesting attacks.

## Improvements

* **App**
  * File Upload Progress Indicator
  * Bring alert for invalid files into the react UI
    * maybe in a modal
    * maybe above or below the info section
  * Add a screen to view an individual document
    * displays more info
    * renders the image
    * could be a client side route or modal

* **API**
  * use a real database
    * [postgres](https://www.postgresql.org/)
    * [rethink](https://www.rethinkdb.com/)
    * [mongo](https://www.mongodb.com/)
  * use a cloud storage service for the document contents
    * [S3](https://aws.amazon.com/s3/)
    * [Google Cloud Storage](https://cloud.google.com/storage/)
    * [Digital Ocean Spaces](https://www.digitalocean.com/products/spaces/)
  * if many more features/endpoints are to be added then maybe maybe use something fancier like [Adonis](https://adonisjs.com/)

## Libraries

* **App**
  * [classnames](https://github.com/JedWatson/classnames)
    * I prefer using the object syntax with this over ternary operators
  * [create-react-app](https://facebook.github.io/create-react-app/docs/getting-started)
    * not really a library
    * but I use this for all the webpack heavy lifting, css reset, and css modules
  * [numeral](http://numeraljs.com/)
    * to format 1000 bytes into `1kb` etc.
  * [query-string](https://www.npmjs.com/package/query-string)
    * I really only use it [here](https://github.com/lrosa007/lucas-07_28_2019/blob/master/web/src/utils/api.js#L60)
    * It's a clean/easy way to turn an object into a query string.
  * [@testing-library/react](https://github.com/testing-library/react-testing-library)
    * Was brought up during the interview with the developers so I wanted to try it
    * Overall a good API for testing react components
  * @testing-library/jest-dom
    * came along from the react-testing-library setup
* **API**
  * [cors](https://expressjs.com/en/resources/middleware/cors.html)
    * used to enable cors
  * [express](http://expressjs.com/)
    * light weight node.js web framework
    * making use of the middlewares and router
  * [formidable](https://www.npmjs.com/package/formidable)
    * handling document uploads
  * [morgan](https://github.com/expressjs/morgan)
    * request logging
  * [rate-limiter-flexible](https://github.com/animir/node-rate-limiter-flexible)
    * rate limiting to prevent
      * DDoS
      * Brute Force
  * [uuid](https://www.npmjs.com/package/uuid)
    * generate unique IDs for uploaded documents

## API

A public API for handling documents.

* **supported**
  * list documents
  * upload a new document
  * delete a document
* **unsupported**
  * get one document by id
  * update a document by id

### GET /documents

Fetches a list of documents

#### Query

* `name: string`
  * Filters documents with a substring match on name

#### Response

```js
{
  data: [
    {
      id: "uuid/string",
      name: "string",
      type: "string",
      size: "number",
      location: "path/string"
    }
  ]
}
```

### POST /documents

Uploads a document and returns it

#### Body

* `file: multi-part/form-data`

#### Response

```js
{
  data: {
    id: "uuid/string",
    name: "string",
    type: "string",
    size: "number",
    location: "path/string"
  }
}
```

### DELETE /documents/:id

Deletes a document with the matching id and returns a success message

#### Params

* `id: uuid/string`
  * ID of the document to delete

#### Response

```js
{ data: '4eae9977-0daa-46ac-93e9-90abf2e36d74 removed' }
```

---

## Other notes

This was fun 🙂
