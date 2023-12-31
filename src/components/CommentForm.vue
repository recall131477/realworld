<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { createComment } from '@/api';
import debounce from 'lodash.debounce';
import type { Comment } from '@/types';
import type { ErrorObject } from '@/types/error';

const emit = defineEmits<{
  (event: 'create-comment', comment: Comment): void;
}>();

const route = useRoute();

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const content = ref('');

const isLoading = ref(false);

const errors = ref<ErrorObject>({});

const handleCreateComment = async () => {
  if (content.value === '') return;

  isLoading.value = true;

  try {
    const res = await createComment(route.params.slug as string, {
      comment: {
        body: content.value,
      },
    });

    emit('create-comment', res.data.comment);
    content.value = '';
  } catch (error) {
    errors.value = (error as any).errors;
  }

  isLoading.value = false;
};

const debounceHandleCreateComment = debounce(() => {
  handleCreateComment();
}, 250);
</script>

<script lang="ts">
export default {
  name: 'CommentFormComponent',
};
</script>

<template>
  <form
    class="rounded border border-[#e5e5e5]"
    @submit.prevent="debounceHandleCreateComment"
  >
    <textarea
      class="block w-full resize-none rounded bg-white p-5 leading-tight text-[#55595c] outline-none disabled:pointer-events-none disabled:bg-[#eceeef]"
      rows="3"
      placeholder="Write a comment..."
      :disabled="isLoading"
      v-model.trim="content"
    ></textarea>
    <div
      class="flex justify-between border-t border-[#e5e5e5] bg-[#f5f5f5] px-5 py-3"
    >
      <img
        :src="userInfo?.image"
        :alt="userInfo?.username"
        class="h-[30px] w-[30px] rounded-full"
      />
      <button
        type="submit"
        class="inline-block rounded bg-primary px-2 py-1 text-sm text-white duration-300 hover:bg-primary-dark disabled:pointer-events-none disabled:opacity-60"
        :disabled="isLoading || content === ''"
      >
        Post Comment
      </button>
    </div>
  </form>
</template>
