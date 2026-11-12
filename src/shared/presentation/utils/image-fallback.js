/**
 * Marks images that failed to load so CSS can show a neutral placeholder
 * instead of the browser's broken-image icon. Works for images added later too.
 */
export function initializeImageFallback(root = document) {
    root.addEventListener(
        "error",
        event => {
            if (event.target instanceof HTMLImageElement) {
                event.target.classList.add("is-broken");
            }
        },
        true
    );
}
