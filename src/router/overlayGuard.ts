import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useOverlayStore } from '../stores/overlay';
import { storeToRefs } from 'pinia';

export function overlayGuard(
  _: RouteLocationNormalized,
  __: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const overlayStore = useOverlayStore();
  const { hasOverlay, getCurrentOverlay } = storeToRefs(overlayStore);
  
  if (hasOverlay.value) {
    getCurrentOverlay.value.callback();
    next(false);
  } else {
    next();
  }
}
