import { Icon } from "components/Defaults/Icon.tsx";
import { History } from "datex-core-legacy/utils/history.ts";

// Initializing a pointer with the content of the LoremIpsum file
const content = $$<string>(await datex.get("./LoremIpsum.txt"));

// Creating history object
const history = new History();
history.add(content);

// Textarea element
const textarea = <textarea/> as HTMLTextAreaElement;

effect(()=>{
	// Effect gets triggered on pointer change
	textarea.value = val(content);
})
textarea.addEventListener("input", (e) => {
	// Event gets triggered on area input
	content.setVal(textarea.value);
	e.preventDefault();
	e.stopPropagation();
})

export default
	<main>
		<header>
			<span onclick:frontend={() => history.back()}>
				Undo ({always(()=>(val(content), history.backSteps))})
				<Icon name="fa-undo"/>
			</span>
			<span onclick:frontend={() => history.forward()}>
				Redo ({always(()=>(val(content), history.forwardSteps))})
				<Icon name="fa-redo"/>
			</span>
		</header>
		{textarea}
	</main>

// @ts-ignore $
globalThis.content = content;