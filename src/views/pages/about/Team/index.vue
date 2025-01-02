<template>
  <TopNavigationBar9 />
  <main class="main-bg">
    <Hero />
    <Team />
  </main>
  <Footer9 />
</template>

<script lang="ts" setup>
import TopNavigationBar9 from '@/views/pages/about/Team/components/TopNavigationBar9.vue'
//import Achievements from '@/views/pages/about/Team/components/Achievements.vue'
import Hero from '@/views/pages/about/Team/components/Hero.vue'
import Team from '@/views/pages/about/Team/components/Team.vue'
import Footer9 from '@/views/pages/about/Team/components/Footer9.vue'
</script>

<style scoped>
/* .main-bg {
  background: url('@/assets/images/bg/greenLeaves2.jpg') no-repeat center center;
  background-size: cover;
  min-height: 100vh;
} */
</style>

