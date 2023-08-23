<script lang="ts">
export default {
  name: 'CommentPreviewComponent',
};
</script>

<script setup lang="ts">
import type { Comment } from '@/types';
import { formatDate } from '@/helper';

defineProps<{
  comment: Comment;
}>();
</script>

<template>
  <div class="rounded border border-[#e5e5e5]">
    <div class="p-5">
      <p>
        {{ comment.body }}
      </p>
    </div>
    <div
      class="flex items-center justify-between border-t border-[#e5e5e5] bg-[#f5f5f5] px-5 py-3 text-sm"
    >
      <div class="flex items-center gap-x-2">
        <router-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          <img
            class="h-5 w-5 rounded-full"
            :src="comment.author.image"
            :alt="comment.author.username"
          />
        </router-link>
        <router-link
          class="text-primary"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          {{ comment.author.username }}
        </router-link>
        <span class="text-[#bbbbbb]">{{ formatDate(comment.createdAt) }}</span>
      </div>
      <span
        class="cursor-pointer text-base text-[#333333] opacity-60 duration-300 hover:opacity-100"
      >
        <i class="ion-trash-a"></i>
      </span>
    </div>
  </div>
</template>
