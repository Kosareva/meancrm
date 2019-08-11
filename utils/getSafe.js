export function getSafe(fn) {
    try {
        return fn();
    } catch (e) {
        return undefined;
    }
}