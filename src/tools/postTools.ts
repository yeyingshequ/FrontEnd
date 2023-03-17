export function toRichText(content: string) {
    //console.log("content:", content)
    let lines = content.split('\n')
    content = lines.map((line: any) => `<p class="postStyle">${line}</p>`).join('')
    content = content.replace(/\s{1,}/g, ' ')
    //console.log("content:", content)
    return content
}
