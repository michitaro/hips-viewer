import { Globe, CameraMode, events, Angle, EquatorialCoord } from '@hscmap/stellar-globe'
import { Component, Vue, Provide, Prop } from "vue-property-decorator"
import * as easing from "@hscmap/easing"


interface Camera {
    fovy: number
    roll: number
    mode: CameraMode
    coord: [number, number]
}


@Component({
    provide() {
        return { globeComponent: this }
    }
})
export class GlobeComponent extends Vue {
    globe!: Globe

    @Prop({ default: false })
    retina!: boolean

    @Prop({ required: true })
    camera!: Camera

    created() {
        this.globe = new Globe()
        this.setWatcheres()
    }

    private watchAndApply<T>(f: () => T, cb: (val: T) => void) {
        this.$watch(f, cb, { immediate: true })
    }

    private setWatcheres() {
        this.watchAndApply(() => this.retina, retina => this.globe.viewFactory.setRetina(retina))
        this.watchAndApply(() => this.camera, ({ fovy, roll, mode, coord: [a, d] }) => {
            const vf = this.globe.viewFactory
            vf.fovy = fovy
            vf.roll = roll
            vf.mode = mode
            vf.coord = EquatorialCoord.fromRad(a, d)
            this.globe.requestRefresh()
        })
        this.globe.ee.on(events.CameraMoveEvent, e => {
            const { fovy, roll, mode, coord: { a, d } } = this.globe.viewFactory
            const camera = { fovy, roll, mode, coord: [a.rad, d.rad] }
            this.$emit('update:camera', camera)
        })
    }

    get infoText() {
        const { coord, fovy, roll } = this.camera
        const { a, d } = EquatorialCoord.fromRad(coord[0], coord[1]).toString()
        return `&alpha;=${a} &delta;=${d} fov=${Angle.fromRad(fovy).deg.toFixed(4)}&deg;`
    }

    mounted() {
        const globe = this.globe
        globe.mount(this.$refs.mountpoint as HTMLElement)
        globe.resize()
        this.$emit('mounted', globe)
    }

    beforeDestroy() {
        this.globe.release()
    }
}