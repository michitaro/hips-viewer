<template lang="pug">
window(title="HiPS Properties", :isOpen="$root.hipsInformation.show", initialPosition="20 / -20", :closeButton="true", @closebuttonclick="$root.hipsInformation.show = false")
    template(v-if="$root.hipsInformation.properties != null")
        table
            tr
                th Title
                td {{p.obs_title}}
            tr
                th ID
                td {{p.creator_did || p.publisher_did}}
            tr
                th Obs. Copyright
                td
                    a(:href="p.obs_copyright_url", v-text="p.obs_copyright", target="_blank")
            tr(v-if="p.hips_copyright")
                th HiPS Copyright
                td {{p.hips_copyright}}
            tr(v-if="p.hips_creator")
                th HiPS Creator
                td {{p.hips_creator}}
            tr
                th HiPS URL
                td
                    a(:href="service_url", v-text="service_url", target="_blank")
</template>


<script lang="ts">
import { MyInfoWindowComponent } from "./script"
export default MyInfoWindowComponent
</script>


<style lang="scss" scoped>
table {
  td {
    max-width: 50vw;
  }
  * {
    font-size: small;
    font-family: monospace;
  }
}
a {
  color: white;
}
th {
  text-align: right;
  padding-right: 1em;
}
</style>
