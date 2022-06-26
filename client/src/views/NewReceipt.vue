<script setup lang="ts">
import ReceiptForm from "/src/components/ReceiptForm.vue"
const formType = false
const buttonText = 'Create'
</script>

<template>
  <div class="container flex flex-wrap mx-auto"> 
      <h2 class="pt-12 pb-4 font-semibold text-2xl tracking-tight">Create New Receipt</h2>
      <ReceiptForm :editPage="formType" :buttonText="buttonText" />
  </div>
</template>
