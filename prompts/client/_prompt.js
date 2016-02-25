if (Meteor.isClient) {

	Template._prompt.helpers ({
		selectedPromptType: function() {
			return this.selectedPromptType
		},

    promptTypes: function() {
			return [ {"type": "shortAnswer", "label": "Short Answer"},
							 {"type": "paragraph", "label": "Paragraph"}
						 ]
  	}
	});
}
