<script lang="ts">
export default {
  name: 'CommentPreviewComponent',
};
</script>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import type { Comment } from '@/types';
import type { ErrorObject } from '@/types/error';
import { formatDate } from '@/helper';
import { deleteComment } from '@/api';

const props = defineProps<{
  comment: Comment;
}>();

const emit = defineEmits<{
  (event: 'delete-comment', id: number): void;
}>();

const route = useRoute();

const isDeleting = ref(false);

const errors = ref<ErrorObject>({});

const formatTime = computed(() => {
  const time = new Date(props.comment.createdAt);
  const hour = time.getHours().toString().padStart(2, '0');
  const minute = time.getMinutes().toString().padStart(2, '0');
  return `${hour}:${minute}`;
});

const handleDeleteComment = async () => {
  isDeleting.value = true;

  try {
    await deleteComment(route.params.slug as string, props.comment.id);

    emit('delete-comment', props.comment.id);
  } catch (error) {
    errors.value = (error as any).errors;
  }

  isDeleting.value = false;
};
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
        <span class="text-[#bbb]"
          >{{ formatDate(comment.createdAt) }} {{ formatTime }}</span
        >
      </div>
      <span
        class="cursor-pointer text-base text-[#333] opacity-60 duration-300 hover:opacity-100"
        :class="isDeleting ? 'pointer-events-none' : 'pointer-events-auto'"
        @click="handleDeleteComment"
      >
        <i class="ion-trash-a"></i>
      </span>
    </div>
  </div>
</template>
