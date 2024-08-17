<template>
  <div id="app">
    <button @click="router.go(-1)">Go Back</button>
    <button @click="openModal('modal1')">Open Modal 1</button>
    <button @click="openModal('modal2')">Open Modal 2</button>
    <button @click="openModal('popup1')">Open Popup 1</button>

    <OverlayPanel v-model:isOverlayOpen="isModal1Open">
      <h2>Modal 1</h2>
      <p>This is the first modal.</p>
      <button @click="openModal('modal2')">Open Modal 2</button>
    </OverlayPanel>

    <OverlayPanel v-model:isOverlayOpen="isModal2Open">
      <h2>Modal 2</h2>
      <p>This is the second modal.</p>
      <button @click="openModal('modal3')">Open Modal 3</button>
      <OverlayPanel v-model:isOverlayOpen="isModal3Open">
        <h2>Modal 1</h2>
        <p>This is the first modal.</p>
        <button @click="openModal('popup1')">Open Popup</button>
      </OverlayPanel>
    </OverlayPanel>

    <OverlayPanel v-model:isOverlayOpen="isPopup1Open">
      <h2>Popup 1</h2>
      <p>This is a popup.</p>
    </OverlayPanel>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import OverlayPanel from "./overlay/OverlayPanel.vue";

const router = useRouter();

// 모달/팝업 상태 관리
const isModal1Open = ref(false);
const isModal2Open = ref(false);
const isModal3Open = ref(false);
const isPopup1Open = ref(false);

const openModal = (modalName: string) => {
  if (modalName === "modal1") {
    isModal1Open.value = true;
  } else if (modalName === "modal2") {
    isModal2Open.value = true;
  } else if (modalName === "modal3") {
    isModal3Open.value = true;
  } else if (modalName === "popup1") {
    isPopup1Open.value = true;
  }
};
</script>

<style>
#app {
  text-align: center;
  padding: 20px;
}

button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
}
</style>
