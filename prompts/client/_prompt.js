if (Meteor.isClient) {

	Template._prompt.helpers ({
		selectedPromptType: function() {
			return this.selectedPromptType
		},

		responsePreview: function() {
			return this.selectedPromptType == "paragraph" ? "paragraphResponsePreview" : "shortAnswerResponsePreview"
		},

    promptTypes: function() {
			return [ {"type": "shortAnswer", "label": "Short Answer"},
							 {"type": "paragraph", "label": "Paragraph"}
						 ]
  	}
	});
}
