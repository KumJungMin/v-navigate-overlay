<template>
  <OverlayPanel :isOverlayOpen="props.isOverlayOpen" @close="closeModal">
    <h2>Modal 1</h2>
    <p>This is the first modal.</p>
    <button @click="emit('openModal2')">Open Modal 2</button>
  </OverlayPanel>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import OverlayPanel from "../overlay/OverlayPanel.vue";

// Props를 정의합니다.
const props = defineProps({
  isOverlayOpen: {
    type: Boolean,
    required: true,
  },
});

// Emits를 정의합니다.
const emit = defineEmits(["update:isOverlayOpen", "openModal2"]);

// 모달을 닫는 함수입니다.
const closeModal = () => {
  emit("update:isOverlayOpen", false); // 부모에게 모달 닫기 요청을 보냅니다.
};
</script>
