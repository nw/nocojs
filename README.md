
# NoCo Example App

## Setup / Install

```
git clone https://github.com/nw/nocojs.git
cd nocojs
npm install
npm run webpack
```

* Note: `npm run webpack` generates the front-end js code. If you make changes to `client/frontend.js` you will need to re-run for changes to update. Will automate shortly.


### Install `ngrok`

* [download](https://ngrok.com/)
* Before starting app run `ngrok http 3333` - this will create a tunnel that forwards traffic and give you a public url. It will look like `http://{string}.ngrok.io`

If you have a pro account you can setup your own domain and do something like:

`ngrok http -hostname=local.nw.is 3333`

### Twilio Account Setup

* [Sign up for a free trial](https://www.twilio.com/try-twilio)
* Create a phone number
* Edit webooks to the following:
  * Voice: `http://{string}.ngrok.io/phone/incoming`
  * SMS: `http://{string}.ngrok.io/sms/incoming`

## Run Application

* Make sure ngrok is still running
* `APP_DOMAIN=http://{string}.ngrok.io node app.js` - make sure trailing slash is not included.


## NPM Scripts

* `npm start` - runs application with `nodemon` for auto restarting on file changes
* `npm test` - runs tests
* `npm run coverage` - generates code coverage reports
* `npm run lint` - generates linting report
* `npm run lint-html` - generates html linting reports
* `npm run lint-fix` - fixes linting rules that can safely be fixed
* `npm run plato` - generates complexity reports
* `npm run webpack` - compiles frontend code

## Code Structure

* `app.js` - entry point for `express` application
* `boot/` - bootstrapping for application. Configuration and route attachment
* `client/` - client side javascript that gets compiled to `public/` with `webpack`
* `lib/` - helper libraries for the application. Moved here for organization, simplifies route code and makes unit testing easier
* `public/` - static directory that images and other assets can be served from
* `routes/` - route handlers
* `test/` - tests live here
* `reports/` - created when a reporting function is run (`lint-html`, `plato`, `coverage`)
* `node_modules/` - npm modules are installed here
* `.gitignore` - files and folders to ignore
* `.eslintrc` - lint rules to apply to codebase
* `package.json` - definition of application and resources needed
* `webpack.config.js` - config for compiling front-end code

## Resources

* Familiarity with JavaScript - Great resources to refresh
  * [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  * [Eloquent JavaScript](http://eloquentjavascript.net/) - Book
  * [Effective JavaScript](https://www.amazon.com/gp/product/0321812182) - Book
  * [JavaScript: The Good Parts](https://www.amazon.com/gp/product/0596517742) - Book
* Understanding of Git and a GitHub account
  * [Try Git](https://try.github.io/levels/1/challenges/1)
  * [Git - The Simple Guide](http://rogerdudler.github.io/git-guide/)
* Comfort with the command line interface (CLI)
* [Node.js](https://nodejs.org/en/download/current/) installed.


## License

MIT