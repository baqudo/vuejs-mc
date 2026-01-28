<script setup lang="ts">
interface LinkProp {
  title: string
  to?: string
  icon: string
  action?: string
}

defineProps<{
  links: LinkProp[]
}>();

const emits = defineEmits<{
  'actionClick': [string]
}>();

const actionClick = (link: LinkProp) => {
  const action = link.action || link.title;
  emits('actionClick', action);
};
</script>

<template>
  <template v-for="link in links" :key="link.title">
    <RouterLink v-if="link.to" exact-active-class="text-primary bg-muted" :to="link.to" class="sidebar-link">
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </RouterLink>

    <div v-else class="sidebar-link cursor-pointer" @click="actionClick(link)">
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </div>
  </template>
</template>

<style scoped>
@reference "@/style.css";

.sidebar-link {
  @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground;
}
</style>
