import { boot } from 'quasar/wrappers';
import ActionCableVue from 'actioncable-vue';

interface Cable {
  subscribe: (data: { channel: string; room: 'public' | 'private' }) => void;
  connection: {
    connect: (connectionUrl?: string) => void;
    disconnect: () => void;
  };
  perform: (data: {
    channel: string;
    action: string;
    data: Record<string, unknown>;
  }) => void;
}

export default boot(({ app }) => {
  const actionCableVueOptions = {
    debug: true,
    debugLevel: 'error',
    connectionUrl: process.env.WS_URL,
    connectImmediately: false,
  };
  app.use(ActionCableVue, actionCableVueOptions);
});

export { Cable };
