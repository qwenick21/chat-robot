export function userEnterSubmit(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const enterEvent = e.key === 'Enter' && !e.shiftKey
    enterEvent && e.preventDefault()
    return enterEvent && !e.nativeEvent.isComposing
}