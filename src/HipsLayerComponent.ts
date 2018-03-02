import { Component, Vue, Inject, Prop } from "vue-property-decorator"
import { HipsRenderer, NoopColorMixer, SimpleImageTextureProvider, Layer, Globe, View, ColorMixer } from "@hscmap/stellar-globe"
import { GlobeComponent } from "./GlobeComponent/script"
import * as ajax from './ajax'
import { hipsInformation, Properties } from "./state/hips_information"
import { fixPosition as fixWindowPosition } from "@hscmap/vue-window"
import { EventEmitter } from "@hscmap/event-emitter"
import * as healpix from '@hscmap/healpix'


@Component
export default class HipparcosCatalogLayerComponent extends Vue {
    @Inject()
    globeComponent!: GlobeComponent

    private get globe() { return this.globeComponent.globe }

    private layer!: HipsLayer

    @Prop({ required: true })
    baseUrl!: string

    @Prop({ required: true })
    suffix!: string

    @Prop({ default: false })
    showGrid!: boolean

    mounted() {
        this.setLayer()
        this.watchSource()
        this.$watch(() => this.showGrid, () => this.setShowGrid())
    }

    beforeDestroy() {
        this.globe.removeLayer(this.layer)
    }

    private watchSource() {
        this.$watch(() => [this.baseUrl, this.suffix], (baseUrl, format) => {
            this.globe.removeLayer(this.layer)
            this.setLayer()
        })
    }

    private setShowGrid() {
        const f = () => {
            this.layer.colorMixer!.gridColor = this.showGrid ? [0.25, 0.25, 0.25] : [0, 0, 0]
            this.globe.requestRefresh()
        }
        this.layer.renderer ? f() : this.layer.ee.on(RenderSetEvent, f)
    }

    private setLayer() {
        if (location.href.match(/^https:/) && this.baseUrl.match(/^http:/)) {
            alert('Use https:// HiPS URL not http://')
        }
        this.globe.addLayer(this.layer = new HipsLayer(this.baseUrl, this.suffix))
        this.setShowGrid()
    }

    render() { }
}


class HybridTextureProvider extends SimpleImageTextureProvider {
    // constructor(globe: Globe, readonly baseUrl: string, readonly format: string, tileOrder: number, maxTileOrder: number) {
    //     super(globe, baseUrl, format, tileOrder, maxTileOrder)
    // }

    // private dynamicBaseUrl(order: number, index: number) {
    //     return order >= 3 ? this.baseUrl : `http://anela.mtk.nao.ac.jp/michitaro/delivery/hips2-xxx/${this.baseUrl.split('://')[1]}`
    // }

    // tileId2Url(order: number, index: number) {
    //     const dir = Math.floor(index / 10000) * 10000
    //     return `${this.dynamicBaseUrl(order, index)}/Norder${order}/Dir${dir}/Npix${index}.${this.format}`
    // }
}


class RenderSetEvent { }


class HipsLayer extends Layer {
    renderer?: HipsRenderer
    colorMixer?: GridColorMixer
    properties?: Properties
    ee = new EventEmitter()

    constructor(readonly baseUrl: string, readonly format: string) {
        super()
        this.fetchProperties().catch(e => {
            console.log(e)
        })
    }

    onRemove() {
        if (this.renderer) {
            this.renderer.colorMixer.release()
            this.renderer.textureProvider.release()
            this.renderer.release()
        }
    }

    render(view: View) {
        this.renderer && this.renderer.render(view)
    }

    private setRenderer() {
        const properties = this.properties!
        const maxOrder = Number(properties['hips_order'])
        const tileSize = Number(properties['hips_tile_width'])
        const tileOrder = size2order(tileSize)
        const colorMixer = this.colorMixer = new GridColorMixer(this.globe)
        const textureProvider = new HybridTextureProvider(this.globe, this.baseUrl, this.format, tileOrder, maxOrder, 3)
        this.renderer = new HipsRenderer(this.globe, textureProvider, colorMixer)
        this.ee.emit(new RenderSetEvent())
        this.globe.requestRefresh()
    }

    private async fetchProperties() {
        const url = `${this.baseUrl}/properties`
        const txt = await ajax.get(url)
        const dict: Properties = {}
        for (const line of txt.split('\n'))
            if (!line.match(/^\s*#/)) {
                if (line.indexOf('=') >= 0) {
                    const [k, v] = line.split('=').map(s => s.replace(/\s*(.*?)\s*$/, '$1'))
                    dict[k] = v
                }
            }
        if (!('hips_order' in dict) || !('hips_tile_width' in dict)) {
            throw `invalid properties file`
        }
        hipsInformation.properties_url = url
        hipsInformation.properties = dict
        Vue.nextTick(() => fixWindowPosition())
        this.properties = dict
        this.globe && this.setRenderer()
    }
}


class GridColorMixer extends ColorMixer {
    fragmentShaderSource() {
        return `
            uniform sampler2D u_texture1;
            uniform vec3 u_grid_color;

            vec4 color(in vec2 c) {
                vec4 color = texture2D(u_texture1, c);
                vec2 p = 2. * (c - vec2(0.5));
                // vec2 p = 2. * (mod(8.*c, vec2(1.)) - vec2(0.5));
                float grid = length(pow(p , vec2(50.)));
                color.rgb += grid * u_grid_color;
                return color;
            }
        `
    }

    gridColor = [0.25, 0.25, 0.25]

    setUniforms() {
        const u_grid_color = this.gridColor
        this.program.uniform3fv({ u_grid_color })
    }
}


function size2order(size: number) {
    let n = 0
    while (size > 0) {
        size >>= 1
        ++n
    }
    return n
}