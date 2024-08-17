import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';


export const useOverlayStore = defineStore('overlay', () => {
  const overlayStack: Ref<Number[]> = ref([]);

  const open = (instanceId: Number) => {
    if (!instanceId) return;

    if (!overlayStack.value.includes(instanceId)) {
      overlayStack.value.push(instanceId);
    }
    
  };

  const close = (instanceId: Number) => {
    if (!instanceId) return;
    
    const index = overlayStack.value.indexOf(instanceId);
    if (index > -1) {
      overlayStack.value.splice(index, 1);
    }
  };

  const getCurrentOverlayInstanceId = () => {
    return overlayStack.value.length > 0 ? overlayStack.value.at(-1) : 0;
  };

  return {
    overlayStack,
    open,
    close,
    getCurrentOverlayInstanceId,
  };
});
