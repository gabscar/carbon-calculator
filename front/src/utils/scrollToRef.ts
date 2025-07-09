export const scrollToRef = (
    ref: React.RefObject<HTMLElement>,
    options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' }
) => {
    if (ref.current) {
        ref.current.scrollIntoView(options);
    }
};