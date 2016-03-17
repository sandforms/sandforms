require 'watir-webdriver'
require 'headless'

Given(/^the user navigates to "([^"]*)" using "([^"]*)"$/) do |arg1, arg2|
    @browser = arg2

    #firefox
    if @browser == 'fire fox'
        @b = Watir::Browser.new
    end

    #safari
    if @browser == 'safari'
        @b = Watir::Browser.new :safari
    end

    #chrome
    if @browser == 'chrome'
        @b = Watir::Browser.new :chrome
    end

    if @browser == 'headless'
      @headless = Headless.new
      @headless.start
      @b = Watir::Browser.new
    end

    @b.goto arg1
    sleep 1
end


Then(/^logs in as an admin$/) do
    sleep 5

    @b.div(:class => 'login-buttons-list').button(:class => 'login oneclick github').click

    if (@browser == 'chrome') || (@browser == 'fire fox')

        @b.div(:class => 'auth-form-body').input(:id => 'login_field').click

        @b.send_keys ENV["USERNAME"]
        @b.send_keys :tab
        @b.send_keys ENV["PASSWORD"]
        @b.send_keys :tab
        @b.send_keys :enter

    end

    sleep 10
end

Then(/^clicks on the "([^"]*)" app$/) do |arg1|
    sleep 5
    @b.span(:text => arg1).click
    sleep 7
end

Then(/^creates a new form$/) do
    @b.button(:text => 'Create new form').click
    sleep 15
end

Then(/^within that form they create "([^"]*)" questions$/) do |arg1|
@count = 1

    while (@count <= arg1.to_i) do

        str_q = "q" + @count.to_s

        @b.div(:class => 'main-content').div(:class => 'grain-container active-grain').iframe(:id => 'grain-frame').input(:placeholder => 'Add new question').send_keys str_q

        @b.send_keys :enter

        @count = @count + 1

    end
end

Then(/^creates a shareable link$/) do

    sleep 1

    @b.div(:class => 'main-content').div(:class => 'grain-container active-grain').iframe(:id => 'grain-frame').element(:id => 'share-form').click

    @b.body.div(:class => 'popup share').div(:class => 'frame align-left').element(:text => 'Get shareable link').click

    @b.body.div(:class => 'popup share').div(:class => 'frame align-left').div(:id => 'shareable-link-tab').form(:class => 'new-share-token').div(:class => 'button-container').button(:text => 'Create').click

    sleep 1

    @answers_url = @b.link(:index => 4).href
    @b.button(:class => 'close-popup').click

end


Then(/^accesses and the newly created questions without answering questions in a new browser window using "([^"]*)"$/) do | arg1 |

    @browser1 = arg1

    #firefox
    if @browser1 == 'fire fox'
        @b1 = Watir::Browser.new
    end

    #safari
    if @browser1 == 'safari'
        @b1 = Watir::Browser.new :safari
    end

    #chrome
    if @browser1 == 'chrome'
        @b1 = Watir::Browser.new :chrome
    end

    if @browser1 == 'headless'
      @headless1 = Headless.new
      @headless1.start
      @b1 = Watir::Browser.new
    end

    @b1.goto @answers_url
    sleep 7

    if (@browser == 'fire fox') || (@browser == 'chrome')
        # Close Sign in pop up
        @b1.button(:class => 'close-popup').click

    end

    if (@browser == 'safari')
        @b1.button(:class => 'incognito-button').click

    end

    sleep 7
    @b1.div(:class => 'main-content').div(:class => 'grain-container active-grain').iframe(:id => 'grain-frame').form(:id => 'submit-form').div(:class => 'input-field').element(:text => 'q1').click

    a_count = 1

    while (a_count < @count) do

        @b1.send_keys :tab

        @b1.send_keys :enter
        a_count = a_count + 1

    end

    sleep 1
    @b1.send_keys :enter

end


Then(/^accesses and responds to the newly created questions in a new browser window using "([^"]*)"$/) do | arg1 |

    @b1.div(:class => 'main-content').div(:class => 'grain-container active-grain').iframe(:id => 'grain-frame').form(:id => 'submit-form').div(:class => 'input-field').element(:text => 'q1').click

    a_count = 1

    while (a_count < @count) do

        @b1.send_keys 'a' + a_count.to_s

        @b1.send_keys :enter
        a_count = a_count + 1
        sleep 1
    end

    sleep 1
    @b1.send_keys :enter

end

Then(/^clicks the feedback link$/) do
    @b1.div(:class => 'main-content').div(:class => 'grain-container active-grain').iframe(:id => 'grain-frame').div(:class => 'main-content').element(:text => 'Please give us feedback').click

    sleep 2

    @b1.close

    if @browser1 == 'headless'
      @headless1.destroy
    end

end

Then(/^accesses the responses in the original browser window$/) do
    @b.div(:class => 'main-content').div(:class => 'grain-container active-grain').iframe(:id => 'grain-frame').div(:class => 'navigation__links').element(:text => 'Responses').click

end

Then(/^signouts$/) do
    @b.element(:class => 'topbar').ul(:class => 'menubar').button(:class => 'show-popup').click
    @b.button(:class => 'logout').click

end

Then(/^closes the original browser$/) do
    @b.close
    if @browser == 'headless'
      @headless.destroy
    end

end
