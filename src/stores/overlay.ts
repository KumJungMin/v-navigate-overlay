import { defineStore } from 'pinia';

interface OverlayInstance {
  id: Number;
  callback?: Function;
}

export const useOverlayStore = defineStore({
  id: 'overlay',
  state: () => ({
    overlayStack: [] as OverlayInstance[],
  }),
  getters: {
    getCurrentOverlay(state): OverlayInstance {
      return state.overlayStack.length > 0 ? state.overlayStack.at(-1)! : { id: 0, callback: () => {} };
    },
    hasOverlay(state): boolean {
      return state.overlayStack.length > 0;
    },
  },
  actions: {
    open(instanceId: Number, callback: Function = () => {}) {
      if (!instanceId) return;

      if (!this.overlayStack.some(overlay => overlay.id === instanceId)) {
        this.overlayStack.push({ id: instanceId, callback });
      }
    },
    close(instanceId: Number) {
      if (!instanceId) return;

      const index = this.overlayStack.findIndex(overlay => overlay.id === instanceId);
      if (index > -1) {
        const overlayInstance = this.overlayStack[index];
        this.overlayStack.splice(index, 1);
        
        // 콜백 함수가 존재하면 호출
        const callback = overlayInstance.callback || (() => {});
        callback();
      }
    },
  },
});
