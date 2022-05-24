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

export const useAuthState = defineStore('auth', {
  state: () => {
    return {
      signedIn: false,
    };
  },
  getters: {},
  actions: {
    signIn(): void {
      const validToken = '1234';
      const room = 'scope_id';
      this.$cable.connection.connect(
        `${process.env.WS_URL}?token=${validToken}&room=${room}`
      );
      this.signedIn = true;
      this.$cable.subscribe({
        channel: 'ConversationsChannel',
        room,
      });
    },
    signOut(): void {
      this.$cable.connection.disconnect();
      this.signedIn = false;
    },
  },
});
