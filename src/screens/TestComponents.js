const decisionModal = new DecisionModal({ menuId: 'decision-modal' });
const offcanvasTest = new Offcanvas({ menuId: 'offcanvas-test', title: 'Test Offcanvas', body: '' });
OptionTabs();
testEventListeners();

const newObjective = {
	currentValue: -1.0
};

function updateNewObjective(props) {
	console.log('updateNewObjective(', props, ');');
	newObjective['currentValue'] = props.value;
	console.log('UPDATE NEW OBJECTIVE', newObjective);
}

const rangeInput = new RangeInput({
	id: 'range-input',
	props: {
		min: 0,
		max: 2,
		currentValue: 1,
		step: 0.5
	},
	label: 'Terrain Opacity',
	callbacks: {
		change: updateNewObjective,
		click: updateNewObjective
	}
});

const selectInput = new SelectInput({
	id: 'select-input',

	defaultValue: 'Select an Option',
	options: {
		key_seq: 'Key Sequence',
		terrain_edit: 'Terrain Modification',
		use_tool: 'Use a Specific Tool'
	},
	label: 'Exercise Type',
	callbacks: {
		change: updateNewObjective
	}
});

const checkInput = new Checkbox({
	id: 'check-input',
	containerID: 'input-test',
	label: 'Exercise Type',
	callbacks: {
		change: updateNewObjective
	}
});

const textArea = new TextAreaInput({
	id: 'text-area',
	containerID: 'input-test',
	label: 'Description',
	callbacks: {
		input: updateNewObjective
	}
});

const textInput = new TextInput({
	id: 'text-input',
	label: 'Objective Title',
	callbacks: {
		input: updateNewObjective
	},
	props: {
		placeholder: 'Insert here the name of the objetive'
	}
});

const offcanvasButton = document.getElementById('btn-test-offcanvas');
offcanvasButton.addEventListener('click', (event) => {
	offcanvasTest.handleVisibility(event);
});

offcanvasTest.addContentToBody(rangeInput);
offcanvasTest.addContentToBody(textInput);
offcanvasTest.addContentToBody(textArea);
offcanvasTest.addContentToBody(checkInput);

const testAccordion = new Accordion({ id: 'test-accordion' });
offcanvasTest.addContentToBody(testAccordion);
testAccordion.addChildren({ itemLabel: 'Objective N°1', itemContent: selectInput });
