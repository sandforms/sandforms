if (Meteor.isClient) {

	Template._prompt.helpers ({
		selectedPromptType: function() {
			return this.selectedPromptType
		},

		responsePreview: function() {
			return this.selectedPromptType == "paragraph" ? "paragraphResponsePreview" : "shortAnswerResponsePreview"
		},

    promptTypes: function() {
			return [ {"type": "shortAnswer", "label": "Short Answer", "selected": this.selectedPromptType == "shortAnswer" ? "selected" : ""},
							 {"type": "paragraph", "label": "Paragraph", "selected": this.selectedPromptType == "paragraph" ? "selected" : ""}
						 ]
  	}
	});
}
