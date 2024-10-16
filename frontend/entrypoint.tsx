import { Icon } from "components/Defaults/Icon.tsx";
import { Textarea } from "./Textarea.tsx";
import { History } from "datex-core-legacy/utils/history.ts";
import { Entrypoint } from "uix/providers/entrypoints.ts";

// Initializing a pointer with the content of the LoremIpsum file
const content = $$<string>(await datex.get("./LoremIpsum.txt"));

// Creating history object with autosave
const autoHistory = new History();
const autoTextarea = <Textarea value={content}/>;
autoHistory.add(content);

// Creating history object without autosave
const manualHistory = new History({explicitSavePoints: true});
const manualTextarea = <Textarea value={content}/>;
manualHistory.add(content);

export default {
	// Redirect to /auto route per default
	'/': new URL("/auto", location.origin),

	// Handling /auto route
	'/auto': <main>
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
				Go to <a href="/manual">/manual</a>
			</div>
		</header>
		{autoTextarea}
	</main>,

	// Handle /manual route
	'/manual': <main>
		<header>
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
			<div>
				Go to <a href="/auto">/auto</a>
			</div>
		</header>
		{manualTextarea}
	</main>
} satisfies Entrypoint;