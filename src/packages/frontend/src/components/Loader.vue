<template>
  <div class="loader-container">
    <div class="loader">
      <div class="bar" v-for="n in 5" :key="n"></div>
    </div>
  </div>
</template>

<style scoped>
/* Center the loader */
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
  width: 100%;
}

/* Bar chart loader */
.loader {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 60px;
  height: 40px;
}

/* Animated bars */
.bar {
  width: 8px;
  height: 10px;
  background: rgb(var(--v-theme-secondary)); /* Vuetify theme color */
  border-radius: 4px;
  animation: bounce 1.2s infinite ease-in-out;
}

/* Staggered animation delays */
.bar:nth-child(1) {
  animation-delay: 0s;
}
.bar:nth-child(2) {
  animation-delay: 0.2s;
}
.bar:nth-child(3) {
  animation-delay: 0.4s;
}
.bar:nth-child(4) {
  animation-delay: 0.6s;
}
.bar:nth-child(5) {
  animation-delay: 0.8s;
}

@keyframes bounce {
  0%,
  100% {
    height: 10px;
  }
  50% {
    height: 30px;
  }
}
</style>
