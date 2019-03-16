'use strict';

const clova = require('@line/clova-cek-sdk-nodejs');

exports.handler = clova.Client 
    .configureSkill()

    .onLaunchRequest(responseHelper => {
        responseHelper.setSimpleSpeech({
            lang: 'ja',
            type: 'PlainText',
            value: 'ハローワールド',
        });
    })

    .onIntentRequest(async responseHelper => {
        const intent = responseHelper.getIntentName();
        // const sessionId = responseHelper.getSessionId();

        console.log('Intent:' + intent);
        if(intent === 'HelloIntent'){
            responseHelper.setSimpleSpeech({
                lang: 'ja',
                type: 'PlainText',
                value: '私はいつも元気です',
            });
 
        }
        if(intent === 'EnglishIntent'){
            responseHelper.setSimpleSpeech({
                lang: 'en',
                type: 'PlainText',
                value: 'hello world',
            });
        }
    })
    
    .onSessionEndedRequest(responseHelper => {
        // const sessionId = responseHelper.getSessionId();
    })
    .lambda()
