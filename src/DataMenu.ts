import { Menu, Menuitem, Menubaritem } from '@hscmap/vue-menu'
import Vue, { CreateElement, VNode } from 'vue'
import { root } from "./state"
const repos = require<FolderEntry>('./repo.json')


let f: FolderEntry

export const DataMenuComponent = Vue.extend({
    render(h: CreateElement) {
        return h(Menubaritem, { props: { label: 'Data' } }, folderComponent(repos, h))
    }
})


type RepoEntry = {
    did: string
    suffixes: string[],
    base_url: string,
}

type FolderEntry = {
    [name: string]: RepoEntry | FolderEntry
}


type Entry = FolderEntry | RepoEntry


function folderComponent(entry: FolderEntry, h: CreateElement): VNode[] {
    const children = Object.keys(entry).sort()
    return children.map(k => {
        const e = entry[k]
        if (isFolderEntry(e)) {
            return h(
                Menuitem, {
                    props: { label: k },
                },
                folderComponent(e, h)
            )
        }
        if (isRepoEntry(e)) {
            return h('div', {}, e.suffixes.map(suffix =>
                h(Menuitem, {
                    props: {
                        label: `${k} (${suffix})`,
                        checked: e.base_url == root.layers.hips.baseUrl && suffix == root.layers.hips.suffix,
                        disabled: !e.base_url,
                    },
                    on: {
                        click() {
                            root.layers.hips.baseUrl = e.base_url
                            root.layers.hips.suffix = suffix
                        }
                    }
                }))
            )
        }
        return h()
    })
}


function repoComponent(label: string, entry: RepoEntry): entry is RepoEntry {
    return !!(entry as any).did
}


function isFolderEntry(entry: Entry): entry is FolderEntry {
    return !(entry as any).did
}


function isRepoEntry(entry: Entry): entry is RepoEntry {
    return !!(entry as any).did
}