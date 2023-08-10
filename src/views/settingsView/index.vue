<script lang="ts">
export default {
  name: 'SettingsView',
};
</script>

<script setup lang="ts"></script>

<template>
  <div class="pt-6">
    <div class="mx-auto max-w-[1140px] px-[15px]">
      <div class="md:mx-auto md:w-1/2">
        <h1 class="text-center text-[40px]">Your Settings</h1>
        <ul class="mb-4 list-disc pl-10 font-bold text-danger">
          <li>error message</li>
        </ul>
        <form>
          <fieldset class="space-y-4">
            <fieldset class="form-group">
              <input
                type="text"
                id="profileUrl"
                name="profileUrl"
                class="border-black/15 block w-full rounded border bg-white px-6 py-3 text-xl leading-tight text-[#55595c] outline-none placeholder:text-[#999999]"
                placeholder="URL of profile picture"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="text"
                id="userName"
                name="userName"
                autocomplete="userName"
                class="border-black/15 block w-full rounded border bg-white px-6 py-3 text-xl leading-tight text-[#55595c] outline-none placeholder:text-[#999999]"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <textarea
                class="border-black/15 block w-full rounded border bg-white px-6 py-3 text-xl leading-tight text-[#55595c] outline-none placeholder:text-[#999999]"
                rows="8"
                placeholder="Short bio about you"
              ></textarea>
            </fieldset>
            <fieldset class="form-group">
              <input
                type="email"
                id="email"
                name="email"
                autocomplete="email"
                class="border-black/15 block w-full rounded border bg-white px-6 py-3 text-xl leading-tight text-[#55595c] outline-none placeholder:text-[#999999]"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="password"
                id="password"
                name="password"
                autocomplete="current-password"
                class="border-black/15 block w-full rounded border bg-white px-6 py-3 text-xl leading-tight text-[#55595c] outline-none placeholder:text-[#999999]"
                placeholder="Password"
              />
            </fieldset>
            <div class="text-right">
              <button
                type="button"
                class="inline-block rounded bg-primary px-6 py-3 text-xl leading-tight text-white duration-300 hover:bg-primary-dark"
              >
                Update Settings
              </button>
            </div>
          </fieldset>
        </form>
        <div class="mt-4 border-t border-black/10 pt-4">
          <button
            class="inline-block rounded border border-danger px-4 py-2 leading-tight text-danger duration-300 hover:bg-danger hover:text-white"
          >
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
