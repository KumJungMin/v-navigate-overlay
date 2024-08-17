<template>
  <transition name="fade">
    <div
      v-if="isOverlayOpen"
      class="overlay-panel"
      :class="{ background: isFirstOverlay }"
    >
      <div class="modal-content">
        <button @click="close">Close</button>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { getCurrentInstance, watchEffect, defineModel, computed } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useOverlayStore } from "@/stores/overlay";

const isOverlayOpen = defineModel("isOverlayOpen", {
  type: Boolean,
  required: false,
});

const overlayStore = useOverlayStore();
const instanceId = getCurrentInstance()?.uid ?? 0;

const close = () => {
  overlayStore.close(instanceId);
  isOverlayOpen.value = false; // 모달을 닫을 때 prop 값을 업데이트
};

onBeforeRouteLeave((_, __, next) => {
  const isCurrentOverlay =
    overlayStore.getCurrentOverlayInstanceId() === instanceId;

  if (isCurrentOverlay) {
    next(false); // 라우터 뒤로가기 막기
    close(); // 모달 닫기
  } else {
    next(); // 진행
  }
});

// 모달 열림/닫힘 상태에 따라 자동으로 스토어 업데이트
watchEffect(() => {
  if (isOverlayOpen.value) {
    overlayStore.open(instanceId);
  } else {
    overlayStore.close(instanceId);
  }
});

const isFirstOverlay = computed(
  () => overlayStore.overlayStack[0] === instanceId
);
</script>

<style>
/* 트랜지션 클래스 정의 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 모달 스타일링 */
.overlay-panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay-panel.background {
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
}
</style>
