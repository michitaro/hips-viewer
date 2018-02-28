import { Component, Vue, Inject, Prop } from "vue-property-decorator"
import { ConstellationLayer } from "@hscmap/stellar-globe";
import { GlobeComponent } from "./GlobeComponent/script";


@Component
export default class ConstellationLayerComponent extends Vue {
    @Inject()
    globeComponent!: GlobeComponent

    @Prop({ default: false })
    showNames!: boolean

    @Prop({ default: true })
    showLines!: boolean

    private get globe() { return this.globeComponent.globe }

    private layer!: ConstellationLayer

    mounted() {
        this.layer = new ConstellationLayer()
        this.globe.addLayer(this.layer)
        this.$watch(() => [this.showLines, this.showNames], ([showLines, showNames]) => {
            this.layer.showLines = showLines
            this.layer.showNames = showNames
            this.globe.requestRefresh()
        }, { immediate: true })
    }

    beforeDestroy() {
        this.globe.removeLayer(this.layer)
    }

    render() { }
}