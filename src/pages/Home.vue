<template>
  <q-page>
    <q-btn v-if="signedIn" @click="signOut">Sign Out</q-btn>
    <q-btn v-else @click="signIn">Sign In</q-btn>
    <q-btn @click="performMessage">Perform a message</q-btn>
    <div v-for="message in messages" :key="message">
      {{ message }}
    </div>
  </q-page>
</template>

<script lang="ts">
import { useAuthState } from 'src/store/auth';
import { useActionCableState } from 'src/store/actionCable';
import { defineComponent, computed } from 'vue';
export default defineComponent({
  name: 'Home',
  setup() {
    const authState = useAuthState();
    const actionCableState = useActionCableState();

    const signedIn = computed(() => authState.signedIn);
    const messages = computed(() => actionCableState.messages);

    const signIn = () => {
      authState.signIn();
    };
    const signOut = () => {
      authState.signOut();
    };

    const performMessage = () => {
      actionCableState.performMessage(
        'ConversationsChannel',
        'created',
        `New message ${Date.now()}`,
        'scope_id'
      );
    };
    return {
      signIn,
      signOut,
      signedIn,
      messages,
      performMessage,
    };
  },
});
</script>
