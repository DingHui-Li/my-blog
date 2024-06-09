import VConsole from 'vconsole';

export default defineNuxtPlugin({
  setup() {
    sessionStorage['debug'] == 1 ? new VConsole() : ''
  }
})