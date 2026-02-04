<script setup lang="ts">
defineProps<{
  title: string;
  value: string | number;
  cardClass?: string;
  textClass?: string;
}>();
</script>

<template>
  <q-card flat bordered :class="cardClass">
    <q-card-section>
      <div class="text-subtitle2">{{ title }}</div>
      <div class="text-h4 text-weight-bolder" :class="textClass">
        {{ value }}
      </div>
    </q-card-section>
  </q-card>
</template>
