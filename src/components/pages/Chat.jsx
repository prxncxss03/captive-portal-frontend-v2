/* Imports PubNub JavaScript and React SDKs to create and access PubNub instance accross your app. */
/* Imports the required PubNub Chat Components to easily create chat apps with PubNub. */
import React from "react";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { Chat, MessageList, MessageInput } from "@pubnub/react-chat-components";

/* Creates and configures your PubNub instance. Be sure to replace "myPublishKey" and "mySubscribeKey"
with your own keyset. If you wish, modify the default "myFirstUser" userId value for the chat user. */
const pubnub = new PubNub({
  publishKey: "pub-c-5cad0a99-5d35-457c-855c-ca512efe615c",
  subscribeKey: "sub-c-1530368a-3ccd-4299-acfe-4c0f20147158",
  userId: "myFirstUser",
});
const currentChannel = "Default";
const theme = 'light';

export const FloatingChat = () => {
    return (
        <PubNubProvider client={pubnub}>
          {/* PubNubProvider is a part of the PubNub React SDK and allows you to access PubNub instance
          in components down the tree. */}
          <Chat {...{ currentChannel, theme }}>
            {/* Chat is an obligatory state provider. It allows you to configure some common component
            options, like the current channel and the general theme for the app. */}
            <MessageList />
            <MessageInput />
          </Chat>
        </PubNubProvider>
      );
    }