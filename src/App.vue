<script setup>

</script>
<template>
  <router-view v-slot="{ Component }">
    <transition mode="out-in">
       <component :is="Component"></component>
    </transition>
  </router-view>
</template>
