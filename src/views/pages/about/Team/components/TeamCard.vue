<template>
  <b-card
    no-body
    class="bg-light-green border-0 overflow-hidden p-0 d-flex flex-row align-items-stretch rounded card-rectangle"
  >
    <!-- Photo on the left -->
    <div class="profile-image-wrapper">
      <img
        :src="team.avatar"
        class="profile-image"
        alt="team avatar"
      />
    </div>
    <!-- Text content -->
    <div class="p-4 d-flex flex-column justify-content-center">
      <h5 class="mb-2 text-dark">{{ team.username }}</h5>
      <small class="text-success d-block mb-2">{{ team.role }}</small>
      <p class="mb-0 text-muted">{{ team.description }}</p>
    </div>
  </b-card>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { type TeamType } from '@/views/pages/about/Team/data';

defineProps({
  team: {
    type: Object as PropType<TeamType>,
    required: true,
  },
});
</script>

<style scoped>
/* Green rectangle styling */
.bg-light-green {
  background-color: #eaf7ea; /* Light green background */
  border-left: 4px solid #28a745; /* Dark green border on the left */
  min-height: 200px; /* Rectangle height */
  display: flex;
  align-items: stretch;
  border-radius: 10px; 
}

/* Profile image wrapper */
.profile-image-wrapper {
  flex-shrink: 0;
  width: 300px; /* Set a fixed width for the image section */
  height: 200%; /* Match the height of the rectangle */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #28a745; /* Optional: Green background behind the image */
  border-radius: 10px; 
}

.profile-image {
  width: 100%;
  height: 100%; /* Stretch to fill the height of the wrapper */
  object-fit: cover; /* Maintain aspect ratio and fill the space */
  border-radius: 0; /* Remove rounded corners */
}

/* Text content styling */
.p-4 {
  flex: 1; /* Ensure the text content fills the remaining space */
}
</style>
