<template>
  <veeForm @submit.prevent="submit">
    <v-text-field></v-text-field>
  </veeForm>
</template>

<script>
export default {
  name: "ManagementMenuView",
  data() {
    return {
      schema: {}
    };
  }
};
</script>

<style lang="scss" scoped></style>
