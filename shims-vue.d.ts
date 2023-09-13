/** 告訴 TS，所有.vue 結尾的文件，從 module 下去找，tsconfig include 此檔案 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<unknown, unknown, unknown>;
  export default component;
}
