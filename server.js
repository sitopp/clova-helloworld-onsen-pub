'use strict';

//パッケージ
const clova = require('@line/clova-cek-sdk-nodejs');
const express = require('express');
const app = new express();

//定数を.envファイルから読み込む
require('dotenv').config();
const EXTENTION_ID = process.env.EXTENTIOIN_ID;
const APP_PASS = process.env.APP_PASS;
const PORT = process.env.PORT;


//debug表示
console.log('EXTENTION_ID:' + EXTENTION_ID);
console.log('APP_PASS:' + APP_PASS);
console.log('PORT:' + PORT);


const clovaSkillHandler = clova.Client
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
        const sessionId = responseHelper.getSessionId();

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
        const sessionId = responseHelper.getSessionId();
    })
    .handle();


    const clovaMiddleware = clova.Middleware({applicationId: EXTENTION_ID});
//    app.post('/clova', clovaMiddleware, clovaSkillHandler);
    app.post(APP_PASS, clovaMiddleware, clovaSkillHandler);    
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
    
    
