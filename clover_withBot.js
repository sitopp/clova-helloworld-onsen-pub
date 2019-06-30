'use strict';

const clova = require('@line/clova-cek-sdk-nodejs');

const BOT_ACCESS_TOKEN = process.env['ACCESS_TOKEN'];

//LINE メッセージ通知 関数
const line = require('@line/bot-sdk');
const pushLineMessage = (text, userId) => {
    const client = new line.Client({
        channelAccessToken: BOT_ACCESS_TOKEN,
    });
    const message = {
        type: 'text',
        text: text,
    };
    userId = ’ここを自分のユーザー ID に書き換える’;
    return client.pushMessage(userId, message);
};


//clovaのリクエスト処理
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
        const userId = responseHelper.getUser().userId;

        console.log('Intent:' + intent);
        console.log('userId:' + userId);

        if (intent === 'HelloIntent') {
            //LINE メッセージ通知
            const text = 'テストです';
            await pushLineMessage(text, userId);
            //clova 応答
            responseHelper.setSimpleSpeech({
                lang: 'ja',
                type: 'PlainText',
                value: '私はいつも元気です',
            });

        } else if (intent === 'EnglishIntent') {
            responseHelper.setSimpleSpeech({
                lang: 'en',
                type: 'PlainText',
                value: 'hello world',
            });
        } else {
            responseHelper.setSimpleSpeech({
                lang: 'ja',
                type: 'PlainText',
                value: 'すみません。もう一度お願いします。',
            });
        }
    })

    .onSessionEndedRequest()
    .lambda();

