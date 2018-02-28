<template lang="pug">
window(title="Data Source", :isOpen="$root.dataSource.show", :closeButton="true", @closebuttonclick="$root.dataSource.show = false")
    dl
        dt URL:
        dd
            input(type="text", placeholder="HiPS Base URL", v-model="$root.layers.hips.baseUrl", size="40")
        dt format:
        dd
            select(v-model="$root.layers.hips.suffix")
                option jpg
                option png
</template>


<script lang="ts">
import { MyDataSourceWindowComponent } from "./script"
export default MyDataSourceWindowComponent
</script>


<style scope lang="scss">
dl {
  margin: 0;
}

* {
  font-family: sans-serif;
}

input,
select {
  background-color: rgba(63, 63, 63, 0.8);
  color: white;
  border-style: none;
}
</style>