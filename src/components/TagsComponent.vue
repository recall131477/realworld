<script lang="ts">
export default {
  name: 'TagsComponent',
};
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { ErrorObject } from '@/types/error';
import { getTags } from '@/api';

const tags = ref<string[]>([]);

const isLoading = ref(false);

const errors = ref<ErrorObject>({});

onMounted(async () => {
  isLoading.value = true;

  try {
    const res = await getTags();
    tags.value = res.tags;
  } catch (error) {
    errors.value = (error as any).errors;
  }

  isLoading.value = false;
});
</script>

<template>
  <div v-if="isLoading" class="py-6">Loading tags...</div>
  <template v-else>
    <div class="mt-1 flex flex-wrap gap-1">
      <router-link
        :to="{
          name: 'tag',
          params: {
            tag: tag,
          },
        }"
        class="rounded-full bg-[#818a91] px-2 py-0.5 text-sm text-white duration-300 hover:bg-[#687077]"
        v-for="tag in tags"
        :key="tag"
        >{{ tag }}</router-link
      >
    </div>
  </template>
</template>
