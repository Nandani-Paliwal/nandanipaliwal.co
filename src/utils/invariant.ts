export function invariant(condition: boolean, errorMessage: string) {
	if (!condition) {
		throw new Error(`[INVARIANT FAILED]; ${errorMessage}`)
	}
}
