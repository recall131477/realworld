<script lang="ts">
export default {
  name: 'EditorArticleView',
};
</script>

<script setup lang="ts"></script>

<template>
  <div class="pt-6">
    <div class="mx-auto max-w-[1140px] px-[15px]">
      <div class="md:mx-auto md:w-10/12">
        <ul class="mb-4 list-disc pl-10 font-bold text-danger">
          <li>error message</li>
        </ul>
        <form>
          <fieldset class="space-y-4">
            <fieldset>
              <input
                type="text"
                id="title"
                name="title"
                autocomplete="title"
                class="border-black/15 block w-full rounded border bg-white px-6 py-3 text-xl leading-tight text-[#55595c] outline-none placeholder:text-[#999999] disabled:pointer-events-none disabled:bg-[#eceeef]"
                placeholder="Article Title"
              />
            </fieldset>
            <fieldset>
              <input
                type="text"
                id="about"
                name="about"
                class="border-black/15 block w-full rounded border bg-white px-6 py-3 text-xl leading-tight text-[#55595c] outline-none placeholder:text-[#999999] disabled:pointer-events-none disabled:bg-[#eceeef]"
                placeholder="What's this article about?"
              />
            </fieldset>
            <fieldset>
              <textarea
                class="border-black/15 block w-full resize-none rounded border bg-white px-6 py-3 text-xl leading-tight text-[#55595c] outline-none placeholder:text-[#999999] disabled:pointer-events-none disabled:bg-[#eceeef]"
                rows="8"
                placeholder="Write your article (in markdown)"
              ></textarea>
            </fieldset>
            <fieldset>
              <input
                type="text"
                id="tags"
                name="tags"
                class="border-black/15 block w-full rounded border bg-white px-6 py-3 text-xl leading-tight text-[#55595c] outline-none placeholder:text-[#999999] disabled:pointer-events-none disabled:bg-[#eceeef]"
                placeholder="Enter tags"
              />
            </fieldset>
            <div class="text-right">
              <button
                type="button"
                class="inline-block rounded bg-primary px-6 py-3 text-xl leading-tight text-white duration-300 hover:bg-primary-dark"
              >
                Publish Article
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>
