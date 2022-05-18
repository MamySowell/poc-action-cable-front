import { createPinia } from 'pinia';
import { Notify } from 'quasar';
import { boot } from 'quasar/wrappers';
import { markRaw } from 'vue';

const pinia = createPinia();

export default boot(({ app }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const $cable = app.config.globalProperties.$cable;
  pinia.use(() => {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      $cable: markRaw($cable),
      $notify: markRaw(Notify),
    };
  });
  app.use(pinia);
});

export { pinia };
