<template>
  <component :is="template">
    <router-view v-slot="{ Component }">
        <component :is="Component"></component>
    </router-view>
  </component>
</template>
<script>
import { ref, watch } from "vue";
import TermsLayout from "./layouts/TermsLayout.vue";
import DashboardLayout from "./layouts/DashboardLayout.vue";
import DefaultLayout from "./layouts/DefaultLayout.vue";
import { useRoute } from "vue-router";
import { Modal }from 'bootstrap';

export default {
  name: "App",
  components: {
    TermsLayout,
    DefaultLayout,
    DashboardLayout,
  },
  setup(props, context) {
    const route = useRoute();

    const template = ref("DefaultLayout");

    watch(
      () => route.name,
      () => {
        template.value = route.meta.layout || "DefaultLayout";
      }
    );

    return {
      template,
    };
  },
};
</script>

<style>
#app {
  height: 100%;
  /* overflow-y: scroll; */
}

html { height: 100%; }
body { height: 100%; }

.route-enter-from {
  opacity: 0;
  transform: scale(0.97);
}
.route-enter-to {
  opacity: 1;
  transform: scale(1);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
</style>
