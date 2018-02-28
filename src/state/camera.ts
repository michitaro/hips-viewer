import { CameraMode, EquatorialCoord, Angle } from "@hscmap/stellar-globe";

const HorseheadNebulaCoord = EquatorialCoord.parse('05:41: 03.9212 δ = -02: 26: 58.7236')
const { a, d } = HorseheadNebulaCoord

const camera = {
    fovy: Angle.fromDeg(1).rad,
    coord: [a.rad, d.rad],
    roll: 0,
    mode: CameraMode.GNOMONIC,
}

export { camera }