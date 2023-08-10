<script lang="ts">
export default {
  name: 'ArticleView',
};
</script>

<script setup lang="ts">
import ArticleMetaComponent from '../../components/ArticleMetaComponent.vue';
</script>

<template>
  <div class="bg-[#333333] py-8 text-white">
    <div class="mx-auto max-w-[1140px] px-[15px]">
      <h1 class="mb-8 text-[44px] font-semibold leading-none">
        Try to transmit the HTTP card, maybe it will override the multi-byte hard drive!
      </h1>
      <ArticleMetaComponent />
    </div>
  </div>
  <div class="pt-8">
    <div class="mx-auto max-w-[1140px] px-[15px]">
      <div class="font-serif text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil asperiores iusto distinctio aspernatur fugiat
        dolorem quae odit repellendus similique cupiditate animi quidem, maxime explicabo optio temporibus eveniet
        mollitia eum! Quos nulla veritatis expedita culpa nostrum, incidunt repellat ullam accusamus ea laboriosam
        inventore nisi assumenda, explicabo aut, ab dolore facere voluptate!
      </div>
      <ul class="mt-8 flex gap-1">
        <li>
          <a href="javascript:;" class="rounded-full border border-[#dddddd] px-2 text-sm font-light text-[#aaaaaa]">
            voluptate
          </a>
        </li>
        <li>
          <a href="javascript:;" class="rounded-full border border-[#dddddd] px-2 text-sm font-light text-[#aaaaaa]">
            rerum
          </a>
        </li>
      </ul>
      <div class="mb-12 mt-8 border-t border-black/10 pt-6">
        <div class="flex justify-center">
          <ArticleMetaComponent />
        </div>
      </div>
      <div class="space-y-3 md:mx-auto md:w-2/3">
        <form class="rounded border border-[#e5e5e5]">
          <textarea
            class="block w-full resize-none rounded bg-white p-5 leading-tight text-[#55595c] outline-none disabled:pointer-events-none disabled:bg-[#eceeef]"
            rows="3"
            placeholder="Write a comment..."
          ></textarea>
          <div class="flex justify-between border-t border-[#e5e5e5] bg-[#f5f5f5] px-5 py-3">
            <a href="javascript:;" class="h-8 w-8 rounded-full bg-pink-500"></a>
            <button
              type="button"
              class="inline-block rounded bg-primary px-2 py-1 text-sm text-white duration-300 hover:bg-primary-dark disabled:pointer-events-none disabled:opacity-60"
            >
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
