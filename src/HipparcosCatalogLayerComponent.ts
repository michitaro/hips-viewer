import { Component, Vue, Inject } from "vue-property-decorator"
import { HipparcosCatalogLayer } from "@hscmap/stellar-globe";
import { GlobeComponent } from "./GlobeComponent/script";


@Component
export default class HipparcosCatalogLayerComponent extends Vue {
    @Inject()
    globeComponent!: GlobeComponent

    private get globe() { return this.globeComponent.globe }

    private layer!: HipparcosCatalogLayer

    mounted() {
        this.layer = new HipparcosCatalogLayer()
        this.globe.addLayer(this.layer)
    }

    beforeDestroy() {
        this.globe.removeLayer(this.layer)
    }

    render() { }
}