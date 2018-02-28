export function get(url: string) {
    return new Promise<string>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.addEventListener('load', e => resolve(xhr.response))
        xhr.responseType = 'text'
        xhr.send()
    })
}