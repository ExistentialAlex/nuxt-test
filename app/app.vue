<script setup lang="ts">
import * as locales from '@nuxt/ui/locale';

const { locale } = useI18n();
</script>
<template>
  <UApp :locale="locales[locale as keyof typeof locales]" :tooltip="{ delayDuration: 0 }">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
