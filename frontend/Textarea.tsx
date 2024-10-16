import { type Pointer } from "datex-core-legacy/datex_all.ts";

// Textarea functional component
export const Textarea = template<{value: any}>(({value}: {value: Pointer<string>}) => {
	const textarea = <textarea spellcheck="false"/> as HTMLTextAreaElement;
	effect(()=>{
		// Effect gets triggered on pointer change
		textarea.value = val(value);
	})
	textarea.addEventListener("input", (e) => {
		// Event gets triggered on area input
		value.setVal(textarea.value);
	});
	return textarea;
});