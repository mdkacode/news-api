 import Expo from 'expo-server-sdk';
// Create a new Expo SDK client
let expo = new Expo();
const notification = (title,desc) => {
let messages = [];
console.log('Hello');
// Create the messages that you want to send to clents
let pushToken = "ExponentPushToken[VpqqbKFo9ujGpg3BMj09pC]";
const somePushTokens = ["ExponentPushToken[VpqqbKFo9ujGpg3BMj09pC]"]
// for (let pushToken of somePushTokens) {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${ExponentPushToken[VpqqbKFo9ujGpg3BMj09pC]} is not a valid Expo push token`);
        
    }

    // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
    messages.push({
       
        to: pushToken,
        title:title,
        sound: 'default',
        body: desc,
        data: { withSome: 'data' },
    })


// The Expo push notification service accepts batches of notifications so
// that you don't need to send 1000 requests to send 1000 notifications. We
// recommend you batch your notifications to reduce the number of requests
// and to compress them (notifications with similar content will get
// compressed).
let chunks = expo.chunkPushNotifications(messages);
let tickets = [];
(async () => {
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
        try {
            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            console.log(ticketChunk);
            tickets.push(...ticketChunk);
            // NOTE: If a ticket contains an error code in ticket.details.error, you
            // must handle it appropriately. The error codes are listed in the Expo
            // documentation:
            // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
        } catch (error) {
            console.error(error);
        }
    }
})();
 }

export default notification;