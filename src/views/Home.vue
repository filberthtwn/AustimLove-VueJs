<template>
  <div>
    <button @click="showHeading = !showHeading">Toggle</button>
    <br />
    <transition name="heading">
      <h1 v-if="showHeading">Home</h1>
    </transition>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup(props, context) {
    const showHeading = ref(false);

    return {
      showHeading,
    };
  },
};
</script>

<style scoped>
.heading-enter-from {
  opacity: 0;
}

.heading-enter-to {
  opacity: 1;
}

.heading-enter-active {
  /* animation: dummy 1s ease; */
  transition: all 0.4s ease;
}

.heading-leave-from {
  opacity: 1;
}

.heading-leave-to {
  opacity: 0;
}

.heading-leave-active {
  transition: all 0.4s ease;
}

/* @keyframes dummy {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  60% {
    transform: translateX(8px);
  }
  70% {
    transform: translateX(-8px);
  }
  80% {
    transform: translateX(4px);
  }
  90% {
    transform: translateX(-4px);
  }
  100% {
    transform: translateX(0px);
  }
} */
</style>
