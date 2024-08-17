<script setup lang="ts">
import { useRouter } from "vue-router";
import { useOverlayStore } from "./stores/overlay";
import { storeToRefs } from "pinia";

const router = useRouter();
const overlayStore = storeToRefs(useOverlayStore());
</script>

<template>
  <h1>Modal Route Back Test</h1>
  <p>
    When the router history is stacked and multiple modals are open,
    <br />clicking the back button will close the modals instead of navigating
    through the router history.<br />
    <a href="https://github.com/KumJungMin/v-navigate-overlay"
      >Check the source code</a
    >
  </p>
  <hr />
  <button @click="router.push('/home')">Go Home</button>
  <button @click="router.push('/about')">Go About</button>
  <div class="summary">current Stack {{ overlayStore.overlayStack }}</div>
  <router-view> </router-view>
</template>

<style scoped>
.summary {
  position: fixed;
  top: 20px;
  font-size: 20px;
  background-color: #f0f0f0;
  padding: 10px;
}
</style>
