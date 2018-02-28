<template lang="pug">
    .stellar-globe
        .mount-point(ref="mountpoint")
        slot
        .info(v-html="infoText")
</template>


<script lang="ts">
import { GlobeComponent } from "./script"
export default GlobeComponent
</script>


<style lang="scss" scoped>
.stellar-globe,
.mount-point {
  height: 100%;
}

.info {
  position: absolute;
  bottom: 0;
  right: 1em;
  color: #577;
  font-family: monospace;
}
</style>