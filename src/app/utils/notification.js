"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const expo_server_sdk_1 = require("expo-server-sdk");
let expo = new expo_server_sdk_1.default();
const notification = (title, desc) => {
    let messages = [];
    console.log('Hello');
    let pushToken = "ExponentPushToken[VpqqbKFo9ujGpg3BMj09pC]";
    const somePushTokens = ["ExponentPushToken[VpqqbKFo9ujGpg3BMj09pC]"];
    if (!expo_server_sdk_1.default.isExpoPushToken(pushToken)) {
        console.error(`Push token ${ExponentPushToken[VpqqbKFo9ujGpg3BMj09pC]} is not a valid Expo push token`);
    }
    messages.push({
        to: pushToken,
        title: title,
        sound: 'default',
        body: desc,
        data: { withSome: 'data' },
    });
    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    (() => __awaiter(this, void 0, void 0, function* () {
        for (let chunk of chunks) {
            try {
                let ticketChunk = yield expo.sendPushNotificationsAsync(chunk);
                console.log(ticketChunk);
                tickets.push(...ticketChunk);
            }
            catch (error) {
                console.error(error);
            }
        }
    }))();
};
exports.default = notification;
//# sourceMappingURL=notification.js.map