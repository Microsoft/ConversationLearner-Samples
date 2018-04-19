/**
 * Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
 */
import * as dotenv from 'dotenv'
import * as convict from 'convict'
import { ICLOptions } from 'conversationlearner-sdk';

const result = dotenv.config()
if (result.error) {
    console.warn(`Error loading .env configuration: ${result.error}`)
}

export const config = convict({
    luisAuthoringKey: {
        format: String,
        default: undefined,
        env: 'LUIS_AUTHORING_KEY'
    },
    luisSubscriptionKey: {
        format: String,
        default: undefined,
        env: 'LUIS_SUBSCRIPTION_KEY'
    },
    apimSubscriptionKey: {
        format: String,
        default: undefined,
        env: 'APIM_SUBSCRIPTION_KEY'
    },
    serviceUri: {
        format: 'url',
        default: "https://westus.api.cognitive.microsoft.com/blis/api/v1/",
        env: 'CONVERSATION_LEARNER_SERVICE_URI'
    },
    appId: {
        format: String,
        default: undefined,
        env: 'CONVERSATION_LEARNER_APP_ID'
    },
    botPort: {
        // Must be any type because when deployed port will be named pipe path instead of number
        // E.g. \\.\pipe\959e6a63-76dd-4f11-be42-d29ec0fc585d
        format: '*',
        default: 3978,
        env: 'PORT'
    },
    uiPort: {
        format: 'port',
        default: 5050,
        env: 'CONVERSATION_LEARNER_UI_PORT',
    },
    sdkPort: {
        format: 'port',
        default: 5000,
        env: 'CONVERSATION_LEARNERS_SDK_PORT'
    },
    dolBotUrl: {
        format: 'url',
        default: 'http://127.0.0.1:3978/api/messages',
        env: 'DOL_BOT_URL'
    },
    dolServiceUrl: {
        format: 'url',
        default: 'http://127.0.0.1:3000',
        env: 'DOL_SERVICE_URL'
    },
    redisServer: {
        format: String,
        default: undefined,
        env: 'CONVERSATION_LEARNER_REDIS_SERVER'
    },
    redisKey: {
        format: String,
        default: undefined,
        env: 'CONVERSATION_LEARNER_REDIS_KEY'
    },
    functionUrl: {
        format: 'url',
        default: undefined,
        env: 'CONVERSATION_LEARNER_FUNCTIONS_URL'
    },
    microsoftAppId: {
        format: String,
        default: undefined,
        env: 'MICROSOFTAPPID'
    },
    microsoftAppPassword: {
        format: String,
        default: undefined,
        env: 'MICROSOFTAPPPASSWORD'
    },
    localhost: {
        format: Boolean,
        default: true,
        env: 'CONVERSATION_LEARNER_LOCALHOST'
    },
})

config.validate({ allowed: 'strict' })

export interface ICLSampleConfig extends ICLOptions {
    botPort: string
    redisServer: string | undefined
    redisKey: string | undefined
    functionUrl: string
    appId: string,
    microsoftAppId: string | undefined
    microsoftAppPassword: string | undefined
}

const clOptions = config.getProperties() as ICLSampleConfig

export default clOptions



