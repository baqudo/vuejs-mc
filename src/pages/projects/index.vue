<script setup lang="ts"></script>

<template>
  <div>
    <h1>Welcome to the Projects View!</h1>

    <br />
    <router-link to="/">To Home</router-link>
    <br />
    <router-link :to="{ name: '/projects/[id]', params: { id: '1' } }">Project 1</router-link>
    <br />
    <router-link :to="{ name: '/projects/[id]', params: { id: '2' } }">Project 2</router-link>
  </div>
</template>
