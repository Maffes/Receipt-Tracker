<script setup lang="ts">
import ReceiptForm from "/src/components/ReceiptForm.vue"
const formType = true
const buttonText = 'Update receipt'
</script>

<template>
  <div class="container flex flex-wrap mx-auto"> 
      <h2 class="pt-12 pb-4 font-semibold text-2xl tracking-tight">Edit Receipt</h2>
      <ReceiptForm :editPage="formType" :buttonText="buttonText" />
  </div>
</template>