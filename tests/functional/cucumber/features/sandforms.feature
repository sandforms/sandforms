
  Feature:  Creating a form with SandForms

  #Background:  Install App
  #Given the user navigates to "http://37.218.240.191.xip.io:6080/" using "chrome"
  #Then logs in as an admin
  #Then upload spk


Scenario:  Chrome - create n number of users
  Given the user navigates to "http://37.218.240.191.xip.io:6080/" using "chrome"
  Then logs in as an admin
  Then install Sandorms
  Then clicks on the "SandForms" app
  Then creates a new form
  Then within that form they create "2" questions
  Then creates a shareable link
  Then accesses and the newly created questions without answering questions in a new browser window using "chrome"
  Then accesses and responds to the newly created questions in a new browser window using "chrome"
  Then clicks the feedback link
  Then accesses the responses in the original browser window
  Then uninstall sandforms
  Then signouts
  Then closes the original browser

# Scenario:  Firefox - create n number of users
#   Given the user navigates to "http://37.218.240.191.xip.io:6080/" using "fire fox"
#   Then logs in as an admin
#   Then install Sandorms
#   Then clicks on the "SandForms" app
#   Then creates a new form
#   Then within that form they create "2" questions
#   Then creates a shareable link
#   Then accesses and the newly created questions without answering questions in a new browser window using "fire fox"
#   Then accesses and responds to the newly created questions in a new browser window using "fire fox"
#   Then clicks the feedback link
#   Then accesses the responses in the original browser window
#   Then uninstall sandforms
#   Then signouts
#   Then closes the original browser

#Scenario:  Safari - create n number of users
#  Given the user navigates to "http://37.218.240.191.xip.io:6080/" using "safari"
#  Then logs in as an admin
#  Then clicks on the "SandForms" app
#  Then creates a new form
#  Then within that form they create "2" questions
#  Then creates a shareable link
#  Then accesses and the newly created questions without answering questions in a new browser window using "safari"
#  Then accesses and responds to the newly created questions in a new browser window using "safari"
#  Then clicks the feedback link
#  Then accesses the responses in the original browser window
#  Then signouts
#  Then closes the original browser
