/**
 * Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
 */
import * as path from 'path'
import * as express from 'express'
import { BotFrameworkAdapter } from 'botbuilder'
import { ConversationLearner, ClientMemoryManager, FileStorage } from '@conversationlearner/sdk'
import chalk from 'chalk'
import config from '../config'
import getDolRouter from '../dol'
import { ReadOnlyClientMemoryManager } from '@conversationlearner/sdk/lib/Memory/ClientMemoryManager';

//===================
// Create Bot server
//===================
const server = express()

const isDevelopment = process.env.NODE_ENV === 'development'
if (isDevelopment) {
    console.log(chalk.yellowBright(`Adding /directline routes`))
    server.use(getDolRouter(config.botPort))
}

server.listen(config.botPort, () => {
    console.log(`Server listening to port: ${config.botPort}`)
})

const { bfAppId, bfAppPassword, modelId, ...clOptions } = config

//==================
// Create Adapter
//==================
const adapter = new BotFrameworkAdapter({ appId: bfAppId, appPassword: bfAppPassword });

//==================================
// Storage 
//==================================
// Initialize ConversationLearner using file storage.  
// Recommended only for development
// See "storageDemo.ts" for other storage options
let fileStorage = new FileStorage(path.join(__dirname, 'storage'))

//==================================
// Initialize Conversation Learner
//==================================
const sdkRouter = ConversationLearner.Init(clOptions, fileStorage)
if (isDevelopment) {
    console.log(chalk.cyanBright(`Adding /sdk routes`))
    server.use('/sdk', sdkRouter)
}
let cl = new ConversationLearner(modelId);

//=========================================================
// Bots Buisness Logic
//=========================================================
var inStock = ["cheese", "sausage", "mushrooms", "olives", "peppers"];
var isInStock = function(topping: string) {
    return (inStock.indexOf(topping.toLowerCase()) > -1);
}

//=================================
// Add Entity Logic
//=================================
/**
* Processes messages received from the user. Called by the dialog system. 
* @param {string} text Last user input to the Bot
* @param {ClientMemoryManager} memoryManager Allows for viewing and manipulating Bot's memory
* @returns {Promise<void>}
*/
cl.EntityDetectionCallback(async (text: string, memoryManager: ClientMemoryManager): Promise<void> => {

    // Clear OutOfStock List
    memoryManager.ForgetEntity("OutOfStock");
            
    // Get list of requested Toppings
    let toppings = memoryManager.EntityValueAsList("Toppings");

    // Check each to see if it is in stock
    for (let topping of toppings) {

        // If not in stock, move from Toppings List of OutOfStock list
        if (!isInStock(topping)) {
            memoryManager.ForgetEntity("Toppings", topping);
            memoryManager.RememberEntity("OutOfStock", topping);        
        }
    }
})

//=================================
// Define API callbacks
//=================================
cl.AddAPICallback("FinalizeOrder", async (memoryManager: ClientMemoryManager) => {
    // Save toppings
    memoryManager.CopyEntity("Toppings", "LastToppings")

    // Clear toppings
    memoryManager.ForgetEntity("Toppings")
})

cl.AddRenderCallback("FinalizeOrder", async (memoryManager: ReadOnlyClientMemoryManager) => {
    return "Your order is on its way"
})

cl.AddAPICallback("UseLastToppings", async (memoryManager : ClientMemoryManager) => {
    // Restore last toppings
    memoryManager.CopyEntity("LastToppings", "Toppings");

    // Clear last toppings
    memoryManager.ForgetEntity("LastToppings"); 
})

//=================================
// Handle Incoming Messages
//=================================
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async context => {
        let result = await cl.recognize(context)
        
        if (result) {
            cl.SendResult(result);
        }
    })
})
