import { Vue, Component } from "vue-property-decorator";
import { hipsInformation, Properties } from "../state/hips_information"


@Component
export class MyInfoWindowComponent extends Vue {
    get p() {
        return hipsInformation.properties || {}
    }

    get properties_url() {
        return hipsInformation.properties_url!
    }

    get service_url() {
        return this.properties_url.split('/').slice(0, -1).join('/')
    }
}