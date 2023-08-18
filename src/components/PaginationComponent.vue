<script lang="ts">
export default {
  name: 'PaginationComponent',
};
</script>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  articlesCount: number;
  currentPage: number;
}>();

const emit = defineEmits<{
  (event: 'change-page', page: number): void;
}>();

const totalPage = computed(() => Math.ceil(props.articlesCount / 10));
const calculatePage = computed(() => {
  const getRange = (start: number, end: number): number[] => {
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  };

  const pagination = (): (string | number)[] => {
    let delta: number;
    if (totalPage.value <= 7) {
      delta = 7;
    } else {
      delta =
        props.currentPage > 4 && props.currentPage < totalPage.value - 3
          ? 2
          : 4;
    }

    const range = {
      start: Math.round(props.currentPage - delta / 2),
      end: Math.round(props.currentPage + delta / 2),
    };

    if (range.start - 1 === 1 || range.end + 1 === totalPage.value) {
      range.start += 1;
      range.end += 1;
    }

    let pages: (string | number)[] =
      props.currentPage > delta
        ? getRange(
            Math.min(range.start, totalPage.value - delta),
            Math.min(range.end, totalPage.value)
          )
        : getRange(1, Math.min(totalPage.value, delta + 1));

    const withDots = (
      value: number,
      pair: (string | number)[]
    ): (string | number)[] =>
      pages.length + 1 !== totalPage.value ? pair : [value];

    if (pages[0] !== 1) {
      pages = withDots(1, [1, '...']).concat(pages);
    }

    if (pages[pages.length - 1] < totalPage.value) {
      pages = pages.concat(withDots(totalPage.value, ['...', totalPage.value]));
    }

    return pages;
  };

  return pagination();
});

const changePage = (page: string | number) => {
  if (page === '...') return;

  emit('change-page', page as number);
};
</script>

<template>
  <ul class="mt-4 flex">
    <li v-for="page in calculatePage" :key="page">
      <a
        :aria-label="`Go to page ${page}`"
        href="javascript:;"
        class="-ml-[1px] block border px-3 py-2 duration-300 hover:bg-[#eceeef]"
        :class="{
          'border-[#dddddd] bg-white text-primary': currentPage !== page,
          'border-primary bg-primary text-white': currentPage === page,
        }"
        @click="changePage(page)"
      >
        {{ page }}</a
      >
    </li>
  </ul>
</template>
