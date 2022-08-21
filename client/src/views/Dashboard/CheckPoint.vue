<script setup>
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();

const dashboard = async () => {
  const { data } = await axios.get(
    `/api/dashboard/checkpoint${
      route.params.checkpoint_id === undefined
        ? ""
        : `?checkpoint_id=${route.params.checkpoint_id}`
    }`
  );
  console.log(data);
};

dashboard();
</script>
<template>
  <div class="flex flex-col gap-8">hii</div>
</template>
