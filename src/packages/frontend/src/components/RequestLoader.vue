<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>

<template>
  <div v-if="loading" class="loader-container">
    <div class="orb">
      <div class="ring ring1"></div>
      <div class="ring ring2"></div>
      <div class="ring ring3"></div>
    </div>
  </div>
</template>

<style scoped>
.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  color: #b0b0b0;
}

.orb {
  position: relative;
  width: 64px;
  height: 64px;
  background: radial-gradient(circle, #00bfa6 0%, #004d40 80%);
  border-radius: 50%;
  box-shadow:
    0 0 15px rgba(0, 191, 166, 0.8),
    0 0 30px rgba(0, 191, 166, 0.5);
  animation: pulse 1.8s infinite ease-in-out;
}

.ring {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 2px solid rgba(0, 191, 166, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: spin 4s linear infinite;
}

.ring1 {
  width: 90px;
  height: 90px;
  animation-delay: 0s;
}
.ring2 {
  width: 110px;
  height: 110px;
  animation-delay: 0.5s;
}
.ring3 {
  width: 130px;
  height: 130px;
  animation-delay: 1s;
}

.loader-text {
  margin-top: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #a7fff4;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    box-shadow:
      0 0 15px rgba(0, 191, 166, 0.8),
      0 0 30px rgba(0, 191, 166, 0.5);
  }
  50% {
    transform: scale(1.1);
    box-shadow:
      0 0 25px rgba(0, 191, 166, 1),
      0 0 40px rgba(0, 191, 166, 0.8);
  }
}

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
