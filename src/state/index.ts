import { layers } from "./layers"
import { camera } from './camera'
import { hipsInformation } from "./hips_information"
import { Globe, EquatorialCoord, CameraMode, CameraParams } from "@hscmap/stellar-globe";
import * as easing from '@hscmap/easing'


const root = {
    layers,
    camera,
    retina: false,
    jumpDuration: 400,
    dataSource: {
        show: true,
    },
    hipsInformation,
}


const $ = new class {
    globe!: Globe
}


const methods = {
    setGlobe(globe: Globe) {
        $.globe = globe
    },
    jumpTo(p: Partial<CameraParams>) {
        $.globe.viewFactory.jumpTo(p, root.jumpDuration, root.jumpDuration < 1000 ? easing.fastStart4 : easing.slowStartStop4)
    },
    zoom(fovy: number) {
        methods.jumpTo({ fovy })
    },
    changeMode(mode: CameraMode) {
        $.globe.viewFactory.changeMode(mode)
    },
    toggleMode() {
        const mode = $.globe.viewFactory.mode
        const mode2 = ({
            GNOMONIC: CameraMode.STEROGRAPHIC,
            STEREOGRAPHIC: CameraMode.FLOATING_EYE,
            FLOATING_EYE: CameraMode.GNOMONIC,
        } as any)[mode]
        methods.changeMode(mode2)
    },
    go() {
        const coord1 = $.globe.viewFactory.coord
        const s = prompt('coord ?', `${coord1.a.deg} ${coord1.d.deg}`)
        if (s) {
            try {
                const coord = EquatorialCoord.parse(s)
                methods.jumpTo({coord})
            }
            catch (e) {
                alert(e)
            }
        }
    },
}


export { root, methods }