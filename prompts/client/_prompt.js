if (Meteor.isClient) {

    Template._prompt.helpers({
        selectedPromptType: function () {
            return this.selectedPromptType
        },

        responsePreview: function () {
            var responseTemplateName = "shortAnswerResponsePreview"

            if (this.selectedPromptType == "paragraph") {
                responseTemplateName = "paragraphResponsePreview"
            }

            if (this.selectedPromptType == "multipleChoice") {
                responseTemplateName = "multipleChoiceResponsePreview"
            }

            return responseTemplateName
        },

        promptTypes: function () {
                return [{
                    "type": "shortAnswer",
                    "label": "Short Answer",
                    "selected": this.selectedPromptType == "shortAnswer" ? "selected" : ""
                },
                {
                    "type": "paragraph",
                    "label": "Paragraph",
                    "selected": this.selectedPromptType == "paragraph" ? "selected" : ""
                },
                {
                    "type": "multipleChoice",
                    "label": "Multiple Choice",
                    "selected": this.selectedPromptType == "multipleChoice" ? "selected" : ""
                }
            ]
        }
        
    });

    Template.multipleChoiceResponsePreview.events({
        "submit #response-option": function (event) {
            event.preventDefault();

            var promptId = $(event.target).data('prompt-id');
            var text = event.target.option.value;

            Prompts.updateOption(promptId, text);
            event.target.option.value = "";
        },

        "click .delete-option": function (event) {
            event.preventDefault();

            var promptId = $(event.currentTarget).data('prompt-id');
            var optionId = $(event.currentTarget).data('option-id');
            Prompts.deleteOption(promptId, optionId)
        }
    });
}