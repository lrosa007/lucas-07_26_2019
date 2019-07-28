
# lucas - 07_27_2019

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

#### Web

* `cd lucas-07_28_2019/web`
* `yarn install`
  * `npm i` // if using npm
* `yarn start`
  * `npm start` // if using npm

##### Tests (web only)

* `yarn install`
  * `npm i` // if using npm
* `yarn test`
  * `npm run test` // if using npm

## Security

### Addressed

Since this is a public API, I put a rate limiter in place to make it harder to DDoS the service.
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
// What external libraries have you used and why?

## API
// Any general observation about the API?
// document each endpoint using the following template: ```

### GET /resources
// Description of the endpoint:
// - what does the endpoint do?
// - what does it return?
// - does it accept specific parameters? ```

---

## Other notes
// Anything else you want to mention
