if (Meteor.isClient) {

	Template._prompt.helpers ({
		selectedPromptType: function() {
			return this.selectedPromptType
		},

    promptTypes: function() {
    	return ["_shortTextResponse", "_checkboxResponse"]
  	}
	});
}