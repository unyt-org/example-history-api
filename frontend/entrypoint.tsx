const content = $$("Qui irure Lorem non voluptate pariatur dolor.");
const textarea = <textarea rows="4" cols="50">
	{always(()=>{
		return val(content);
	})}
</textarea> as HTMLTextAreaElement;
textarea.addEventListener("change", () => {
	content.setVal(textarea.value, false)
})
globalThis.content = content;

export default
	<main>
		{textarea}
	</main>