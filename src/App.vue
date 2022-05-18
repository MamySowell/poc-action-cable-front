<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useActionCableState } from 'src/store/actionCable';
const actionCableChannels = ['ConversationsChannel'];

export default defineComponent({
  name: 'App',
  channels: {
    computed: [
      ...actionCableChannels.map((actionCableChannel) => ({
        channelName() {
          return actionCableChannel;
        },
        connected() {
          console.log(`Connected to the channel : ${actionCableChannel}`);
        },
        rejected() {
          console.log(`Rejected from the channel : ${actionCableChannel}`);
        },
        received(message: string) {
          const actionCableState = useActionCableState();
          actionCableState.newMessageEvent(actionCableChannel, message);
        },
        disconnected() {
          console.log(`Disconnected from the channel : ${actionCableChannel}`);
        },
      })),
    ],
  },
  setup() {
    return {};
  },
});
</script>
