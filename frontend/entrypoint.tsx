import { Icon } from "components/Defaults/Icon.tsx";
import { History } from "datex-core-legacy/utils/history.ts";

// Initializing a pointer with the content of the LoremIpsum file
const content = $$<string>(await datex.get("./LoremIpsum.txt"));

// Creating history object with autosave
const autoHistory = new History();
autoHistory.add(content);


// Creating history object without autosave
const manualHistory = new History({explicitSavePoints: true});
manualHistory.add(content);

// Textarea element
const textarea = <textarea spellcheck="false"/> as HTMLTextAreaElement;

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
			<div>
				<h1>Auto</h1>
				<span onclick:frontend={() => autoHistory.back()}>
					Undo ({always(()=>(val(content), autoHistory.backSteps))})
					<Icon name="fa-undo"/>
				</span>
				<span onclick:frontend={() => autoHistory.forward()}>
					Redo ({always(()=>(val(content), autoHistory.forwardSteps))})
					<Icon name="fa-redo"/>
				</span>
			</div>

			<div>
				<h1>Manual</h1>
				<span onclick:frontend={() => manualHistory.setSavePoint()}>
					Save
					<Icon name="fa-save"/>
				</span>
				<span onclick:frontend={() => manualHistory.back()}>
					Undo ({always(()=>(val(content), manualHistory.backSteps))})
					<Icon name="fa-undo"/>
				</span>
				<span onclick:frontend={() => manualHistory.forward()}>
					Redo ({always(()=>(val(content), manualHistory.forwardSteps))})
					<Icon name="fa-redo"/>
				</span>
			</div>
		</header>
		{textarea}
	</main>

// @ts-ignore $
globalThis.content = content;