<script lang="ts">
export default {
  name: 'EditorArticleView',
};
</script>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { CreateArticle } from '@/types';
import type { ErrorObject } from '@/types/error';
import { getArticle, createArticle, updateArticle } from '@/api';

const route = useRoute();
const router = useRouter();

const article = ref<CreateArticle>({
  title: '',
  description: '',
  body: '',
  tagList: [],
});
const tag = ref('');

const isLoading = ref(false);
const isEditing = ref(false);

const errors = ref<ErrorObject>({});

const fetchArticle = async () => {
  isLoading.value = true;

  try {
    const res = await getArticle(route.params.slug as string);
    article.value = res.article;
  } catch (error) {
    errors.value = (error as any).errors;
  }

  isLoading.value = false;
};

const handleArticle = async () => {
  isEditing.value = true;

  try {
    const slug = route.params.slug as string;

    const res = route.params.slug
      ? await updateArticle(slug, { article: article.value })
      : await createArticle({ article: article.value });

    router.push({
      name: 'article',
      params: {
        slug: res.article.slug,
      },
    });
  } catch (error) {
    errors.value = (error as any).errors;
  }

  isEditing.value = false;
};

const addArticleTag = () => {
  if (tag.value === '') return;

  article.value.tagList.push(tag.value);
  tag.value = '';
};

const deleteArticleTag = (index: number) => {
  article.value.tagList.splice(index, 1);
};

onMounted(() => {
  if (route.params.slug) {
    fetchArticle();
  }
});

watch(
  () => route.params.slug,
  (newValue) => {
    if (newValue) {
      fetchArticle();
    } else {
      article.value = {
        title: '',
        description: '',
        body: '',
        tagList: [],
      };
    }
  }
);
</script>

<template>
  <div class="pt-6">
    <div class="mx-auto max-w-[1140px] px-[15px]">
      <div class="md:mx-auto md:w-10/12">
        <div v-if="isLoading">Loading article data...</div>
        <template v-else>
          <ul class="mb-4 list-disc pl-10 font-bold text-danger" v-if="errors">
            <li v-for="(error, field) in errors" :key="field">
              {{ field }} {{ error ? error[0] : '' }}
            </li>
          </ul>
          <form @submit.prevent="handleArticle">
            <fieldset class="space-y-4" :disabled="isEditing">
              <fieldset>
                <input
                  type="text"
                  id="title"
                  name="title"
                  autocomplete="title"
                  class="border-black/15 block w-full rounded border bg-white px-6 py-3 text-xl leading-tight text-[#55595c] outline-none placeholder:text-[#999] disabled:pointer-events-none disabled:bg-[#eceeef]"
                  placeholder="Article Title"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset>
                <input
                  type="text"
                  id="about"
                  name="about"
                  class="border-black/15 block w-full rounded border bg-white px-6 py-3 text-xl leading-tight text-[#55595c] outline-none placeholder:text-[#999] disabled:pointer-events-none disabled:bg-[#eceeef]"
                  placeholder="What's this article about?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset>
                <textarea
                  class="border-black/15 block w-full resize-none rounded border bg-white px-6 py-3 text-xl leading-tight text-[#55595c] outline-none placeholder:text-[#999999] disabled:pointer-events-none disabled:bg-[#eceeef]"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  class="border-black/15 block w-full rounded border bg-white px-6 py-3 text-xl leading-tight text-[#55595c] outline-none placeholder:text-[#999] disabled:pointer-events-none disabled:bg-[#eceeef]"
                  placeholder="Enter tags"
                  v-model="tag"
                  @keypress.enter.prevent="addArticleTag"
                />
                <div
                  v-if="article.tagList.length"
                  class="mt-2 flex flex-wrap gap-1"
                >
                  <span
                    v-for="(tag, index) in article.tagList"
                    :key="tag + index"
                    class="rounded-full bg-[#818a91] px-2 py-0.5 text-xs text-white"
                  >
                    <i
                      class="ion-close-round mr-1 cursor-pointer"
                      @click="deleteArticleTag(index)"
                    ></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <div class="text-right">
                <button
                  type="submit"
                  class="inline-block rounded bg-primary px-6 py-3 text-xl leading-tight text-white duration-300 hover:bg-primary-dark"
                >
                  Publish Article
                </button>
              </div>
            </fieldset>
          </form>
        </template>
      </div>
    </div>
  </div>
</template>
