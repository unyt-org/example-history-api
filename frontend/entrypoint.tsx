const content = $$("Qui irure Lorem non voluptate pariatur dolor.");
const textarea = <textarea rows="4" cols="50"/> as HTMLTextAreaElement;

effect(()=>{
	textarea.value = val(content);
	console.log("change", content.val)
})
textarea.addEventListener("input", (e) => {
	content.setVal(textarea.value)
	e.preventDefault();
	e.stopPropagation();
})
globalThis.content = content;
export default
	<main>
		{textarea}
	</main>