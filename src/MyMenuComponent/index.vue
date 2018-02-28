<template lang="pug">
    menu-style-black(style="position: fixed;")
        menu-bar.menu
            menu-bar-item(label='View')
                menu-item(label="Projection")
                    menu-item(label='Gnomonic', keybind="G", @click="$root.changeMode('GNOMONIC')", :checked="$root.camera.mode == 'GNOMONIC'")
                    menu-item(label='Stereographic', keybind="S", @click="$root.changeMode('STEREOGRAPHIC')", :checked="$root.camera.mode == 'STEREOGRAPHIC'")
                    menu-item(label='Stellar Globe', keybind="T", @click="$root.changeMode('FLOATING_EYE')", :checked="$root.camera.mode == 'FLOATING_EYE'")
                    menu-separator
                    menu-item(label='Toggle Mode', keybind="Z", @click="$root.toggleMode()")
                menu-item(label='Retina', @click="flip($root.camera, 'retina')", keybind='ctrl+R', :checked="$root.camera.retina")
                menu-item(label="Zoom")
                    menu-item(label="tan(&angle;) = 1&prime;", keybind="1", @click="$root.zoom(deg2rad(1/60))")
                    menu-item(label="tan(&angle;) = 5&prime;", keybind="2", @click="$root.zoom(deg2rad(5/60))")
                    menu-item(label="tan(&angle;) = 1&deg;", keybind="3", @click="$root.zoom(deg2rad(1))")
                    menu-item(label="tan(&angle;) = 5&deg;", keybind="4", @click="$root.zoom(deg2rad(5))")
                    menu-item(label="tan(&angle;) = 1", keybind="5", @click="$root.zoom(1)")
                    menu-item(label="tan(&angle;) = 2", keybind="6", @click="$root.zoom(2)")
                    menu-separator
                    menu-item
                        dl(slot="body", @mousedown.stop="")
                            dt Zoom Duration:
                            dd
                                input(type="range", @mousedown.stop="", v-model="$root.jumpDuration", min="400", max="20000")
                menu-separator
                menu-item(label="Go", @click="$root.go()", keybind="ctrl+G")
                menu-item(label='Toggle Full Screen', keybind="F", @click="toggleFullscreen()", :checked="fullscreen")
            menu-bar-item(label='Layer')
                menu-item(label='Grid', @click="flip(layers.grid, 'show')", keybind="alt+G", :checked="layers.grid.show")
                menu-item(label='Hipparcos Catalog', keybind="alt+H", @click="flip(layers.hipparcosCatalog, 'show')", :checked="layers.hipparcosCatalog.show")
                menu-item(label='Constellations')
                    menu-item(label="Show", @click="flip(layers.constellation, 'show')", keybind="alt+C")
                    menu-item(label="Lines", @click="flip(layers.constellation, 'showLines')", :checked="layers.constellation.showLines")
                    menu-item(label="Names", @click="flip(layers.constellation, 'showNames')", :checked="layers.constellation.showNames")
                menu-item(label='HiPS')
                    menu-item(label='Show', keybind="H", @click="flip(layers.hips, 'show')", :checked="layers.hips.show")
                    menu-item(label='Grid', keybind="shift+G", @click="flip(layers.hips, 'showGrid')", :checked="layers.hips.showGrid")
            //- data-menu
            menu-bar-item(label='Window')
                menu-item(label='Data Source', keybind="D", @click="flip($root.dataSource, 'show')", :checked="$root.dataSource.show")
                menu-item(label='Hips Information', keybind="I", @click="flip($root.hipsInformation, 'show')", :checked="$root.hipsInformation.show")
</template>


<script lang="ts">
import { MyMenuComponent } from "./script"
export default MyMenuComponent
</script>


<style lang="scss" scoped>
.menu {
  border-radius: 0 0 4pt 0;
}
dl {
  margin: 0;
}
dd {
  margin-left: 1em;
}
</style>