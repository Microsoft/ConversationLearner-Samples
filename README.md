# BLIS-SDK-SAMPLE

This repo contains sample code for building conversational bots using Microsoft BLIS (Bot Learning Intelligent Service) and demonstrating how to use the `blis-sdk` package.

BLIS reduces the complexity of building bots.  It enables a hybrid development workflow allowing hand-written code and machine learning to reduce the amount of code required to write bots.  Certain absolute parts of your application such as checking if the user is logged in or making an API request to check store inventory can still be coded; however, other changes in state and action selection can be learned from example dialogs given by the domain expert or developer.

[Example video overview of BLIS](https://microsoft-my.sharepoint.com/:v:/p/jawillia/ESlfaljCPbpPlDzmkAhCQbkBdUxsN33eBOf2RycKMiB-Xw?e=SVFmYA) (MS internal only; more videos coming soon)

## Getting started

### Prerequisites

- Node 8.5.0 or higher and npm 5.3.0 or higher.  Install from https://nodejs.org/en/
  
- LUIS authoring key:

  1. Log into http://www.luis.ai

  2. Click on your name in the upper right, then on "settings"

  3. Authoring key is shown on the resulting page

  (BLIS uses LUIS for entity extraction; when you create a BLIS
  application, you'll need a LUIS authoring key)

- VSCode.  https://code.visualstudio.com/  Recommended, not required.

### Installation and first run

1. Clone the repository and change directory

    ```bash
    git clone https://github.com/Microsoft/BLIS-SDK-SAMPLE blis-bot-01
    cd blis-bot-01
    ```

2. Install dependencies and build

    ```bash
    npm install
    npm run build
    ```

    Note: during `npm intsall`, you can ignore this error if it occurs: `gyp ERR! stack Error: Can't find Python executable`

3. Start the admin UI

    This will start a local server hosting a website where you will teach and administer your bot.

    ```bash
    npm run ui
    ```

    (Don't open a web browser to localhost yet; continue to step 4 first.)

4. Try out the password reset bot:

    This repo includes a few demo BLIS bots.  The source of the bots are in `src/demos`.
    
    You can run the demos in VSCode (or another IDE), or from the command line.  Running in an IDE is preferred because it will let you step through the code, which helps show how BLIS works.
    
    To run the demos from VSCode, open the `blis-bot-01` folder in VSCode, and run one of the "demo" launch configurations.  A good place to start is the `demoPasswordReset` bot.

    Or, to run this demo from the command line, run:

    ```bash
    npm run demo-password
    ```

    Then open Google Chrome to http://localhost:5050.  Log in using your MSA (such as @outlook.com, @msn.com, @hotmail.com, or @microsoft.com)

    The first time you start BLIS, you'll need to import the demo apps into your BLIS account.  Click on "Import Demos" -- this will take about a minute and will copy the BLIS apps into your BLIS account.  

    You should now see a list of demo applications.  Click on "demoPasswordReset" to get started.

    You're now using BLIS and can teach your bot.  See this [video tour](https://microsoft-my.sharepoint.com/:v:/p/jawillia/ESlfaljCPbpPlDzmkAhCQbkBdUxsN33eBOf2RycKMiB-Xw?e=SVFmYA) for quick overview (MS internal only; more videos coming soon)

## Switching between bots

To switch to a different demo bot:

In the BLIS web UI, return to the list of apps at http://localhost:5050/home.
    
If a bot is running (like `demoPasswordReset`), stop it.  You do not need to stop the admin UI process, or close the web browser.

Run another demo bot in VSCode or from the command line, following the instructions in step 4.  Demos include:

- VSCode launch configurations:

  ```bash
  demoPasswordReset
  demoPizzaOrder
  demoVRAppLauncher
  demoStorage
  ```
- Command-line npm:

  ```bash
  npm run demo-password
  npm run demo-pizza
  npm run demo-storage
  npm run demo-vrapp
  ```

- Corresponding source files:

  ```bash
  src/demos/demoPasswordReset.ts
  src/demos/demoPizzaOrder.ts
  src/demos/demoStorage.ts
  src/demos/demoVRAppLauncher.ts
  ```

Once you've started a new bot, switch to the BLIS web UI, and click on the corresponding BLIS app to start using the bot.

## Build your own bot

A generic empty BLIS bot is provided in ``blis-bot-01/src/app.ts``.  To run it, first stop the currently running bot that (if any).  To start the empty bot from VSCode, open the `blis-bot-01` folder in VSCode and run the "Empty Bot" launch configuration.  

To run this bot from the command line,

    ```bash
    npm start
    ```

If you make edits to the code in `app.ts`, you'll need to re-compile TypeScript to JavaScript, then re-start your bot.  In VSCode, you can just "Restart Debugging" with `ctrl-shift-F5`. From the command-line, you'll need to stop the bot `ctrl-c`, then re-run `npm start` (which will re-compile TypeScript to JavaScript).

## Advanced configuration

There is a template `.env.example` file shows what environment variables you may set to configure the samples.

You can adjust these ports to avoid conflicts between other services running on your machine.

- Add the `.env` file to root of project

    ```bash
    cp .env.example .env
    ```

    This uses the standard configuration, which lets you run your bot locally, and start using BLIS.  (Later on, to deploy your bot to the Bot Framework, some edits to this file will be needed.)

## Notes

There is NO security or encryption currently -- do not load data into BLIS which is sensitive or from a customer.

## Support

Join the [BLIS team](https://microsoft-my.sharepoint.com/:v:/p/jawillia/ESlfaljCPbpPlDzmkAhCQbkBdUxsN33eBOf2RycKMiB-Xw?e=SVFmYA) (MS internal), or contact blis-support@service.microsoft.com.

## Related repositories

- [blis-sdk](https://github.com/Microsoft/BLIS-SDK)
- [blis-models](https://github.com/Microsoft/BLIS-MODELS)