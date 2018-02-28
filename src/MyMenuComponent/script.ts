import { root, methods } from "../state"
import { Vue, Component } from "vue-property-decorator"
import { CameraMode } from '@hscmap/stellar-globe'
import { DataMenuComponent } from "../DataMenu"
import fullscreen, { Handle as FullscreenHandle } from 'fullscreen'


@Component({
    components: {
        DataMenu: DataMenuComponent,
    }
})
export class MyMenuComponent extends Vue {
    flip(parent: any, key: string) {
        parent[key] = !parent[key]
    }

    toggleFullscreen() {
        this.fullscreen = !this.fullscreen
        if (this.fullscreen) {
            this.fs.request()
        }
        else
            this.fs.release()
    }

    private fs!: FullscreenHandle
    private fullscreen = false

    mounted() {
        this.fs = fullscreen(this.$root.$el)
        this.fs.on('release', () => this.fullscreen = false)
    }

    beforeDestroy() {
        this.fs.dispose()
    }

    private get layers() {
        return root.layers
    }

    deg2rad(deg: number) {
        return deg / 180 * Math.PI
    }
}