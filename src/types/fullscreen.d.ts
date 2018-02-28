declare module "fullscreen" {
    type EventType = 'attain' | 'release' | 'error'

    export interface Handle {
        request(): void
        release(): void
        dispose(): void
        target(): HTMLElement | undefined
        on(type: EventType, cb: () => void): void
    }

    interface Module {
        available(): boolean
        enabled(): boolean
        (target: HTMLElement): Handle
    }

    const module: Module
    export default module
}