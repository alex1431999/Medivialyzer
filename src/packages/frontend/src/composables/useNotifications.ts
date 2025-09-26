import { ref } from 'vue'

const show = ref(false)
const message = ref('')
const color = ref<'success' | 'error' | 'info' | 'warning' | 'secondary'>(
  'secondary',
)

export function useNotifications() {
  const notify = (text: string, type: typeof color.value = 'secondary') => {
    message.value = text
    color.value = type
    show.value = true
  }

  return {
    show,
    message,
    color,
    notify,
  }
}
