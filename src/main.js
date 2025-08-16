  import 'vuetify/styles';
  import { createVuetify } from 'vuetify';
  import * as components from 'vuetify/components';
  import * as directives from 'vuetify/directives';

  import '@mdi/font/css/materialdesignicons.css';

  const vuetify = createVuetify({
    components,
    directives,
  });


import { createApp } from 'vue';
import App from './App.vue';
import router from './components/router';
import store from './components/store';

let app= createApp(App);
app.use(vuetify);
app.use(router);
app.use(store)
app.mount('#app');
