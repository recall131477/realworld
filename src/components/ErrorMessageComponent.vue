<script lang="ts">
export default {
  name: 'ErrorMessageComponent',
};
</script>

<script setup lang="ts">
import type { ErrorObject } from '@/types/error';
defineProps<{
  errors: ErrorObject;
}>();
</script>

<template>
  <ul class="mb-4 list-disc pl-10 font-bold text-danger" v-if="errors">
    <li v-for="(error, field) in errors" :key="field">
      {{ field }} {{ error ? error[0] : '' }}
    </li>
  </ul>
</template>
