// @typescript-eslint/no-explicit-any
import 'pinia';
import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { Cable } from 'src/boot/actionCable';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $cable: Cable;
    $notify: Notify;
  }
}

interface ActionCableState {
  messages: { channel: string; message: string }[];
}

export const useActionCableState = defineStore('actionCable', {
  state: () => {
    return {
      messages: [],
    } as ActionCableState;
  },
  getters: {},
  actions: {
    newMessageEvent(channel: string, message: string) {
      this.messages.push({ channel, message });
      // TODO: dispatch messages action by channel
    },
    performMessage(
      channel: string,
      action: string,
      message: string,
      room: string
    ) {
      this.$cable.perform({ channel, action, data: { message, room } });
    },
  },
});
