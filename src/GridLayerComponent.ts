import { Component, Vue, Inject } from "vue-property-decorator"
import { GridLayer } from "@hscmap/stellar-globe";
import { GlobeComponent } from "./GlobeComponent/script";


@Component
export default class GridLayerComponent extends Vue {
    @Inject()
    globeComponent!: GlobeComponent

    private get globe() { return this.globeComponent.globe }

    private layer!: GridLayer

    created() {
        this.layer = new GridLayer()
        this.globe.addLayer(this.layer)
    }

    beforeDestroy() {
        this.globe.removeLayer(this.layer)
    }

    render() { }
}