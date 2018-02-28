<template lang="pug">
.main
    window-style-black
        my-info-window
        my-data-source-window
    my-menu(style="z-index: 2;")
    globe(:camera.sync="$root.camera", :retina="$root.retina", ref="globeComponent", @mounted="globe => $root.setGlobe(globe)")
        grid-layer(v-if="layers.grid.show")                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        hips-layer(v-if="layers.hips.show", :baseUrl="$root.layers.hips.baseUrl", :suffix="$root.layers.hips.suffix", :showGrid="$root.layers.hips.showGrid")
        constellation-layer(v-if="layers.constellation.show", :showNames="layers.constellation.showNames", :showLines="layers.constellation.showLines")
        hipparcos-catalog-layer(v-if="layers.hipparcosCatalog.show")
</template>


<script lang="ts">
import Vue from 'vue'
import MyMenuComponent from './MyMenuComponent/index.vue'
import GlobeComponent from './GlobeComponent/index.vue'
import GridLayerComponent from './GridLayerComponent'
import ConstellationLayerComponent from './ConstellationLayerComponent'
import HipparcosCatalogLayerComponent from './HipparcosCatalogLayerComponent'
import HipsLayerComponent from './HipsLayerComponent'
import MyInfoWindowComponent from "./MyInfoWindowComponent/index.vue"
import MyDataSourceWindowComponent from './MyDataSourceWindowComponent/index.vue'
import { root } from "./state"

export default Vue.extend({
    components: {
        MyMenu: MyMenuComponent,
        Globe: GlobeComponent,
        GridLayer: GridLayerComponent,
        ConstellationLayer: ConstellationLayerComponent,
        HipparcosCatalogLayer: HipparcosCatalogLayerComponent,
        HipsLayer: HipsLayerComponent,
        MyInfoWindow: MyInfoWindowComponent,
        MyDataSourceWindow: MyDataSourceWindowComponent
    },
    computed: {
        layers: () => root.layers
    },
    mounted() {
        window.addEventListener('resize', e => (this.$refs.globeComponent as any).globe.resize())
    }
})
</script>


<style lang="scss">
body {
  margin: 0;
  overflow: hidden;
}

html,
body,
.main {
  height: 100%;
}

.main {
  width: 100%;
}
</style>