require 'watir-webdriver'
#require 'headless'

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
      @b = Watir::Browser.new :chrome
    end

    @b.goto arg1

end


Then(/^logs in as an admin$/) do
    @b.div(:class => 'login-buttons-list').button(:class => 'login oneclick github').when_present.click

    if (@browser == 'safari')
        binding.pry
    end

    @b.input(:id => 'login_field').send_keys ENV["USERNAME"]
    @b.input(:id => 'password').send_keys ENV["PASSWORD"]
    @b.input(:name => 'commit').click

    @b.element(:text => 'Apps').wait_until_present
end

Then(/^clicks on the "([^"]*)" app$/) do |arg1|

    @b.element(:text => 'Apps').click
    @b.element(:text => 'SandForms').wait_until_present

if (@b.ul(:class => 'navbar').li(:class => 'navitem-create-grain').exists?  == true)
        @b.ul(:class => 'navbar').li(:class => 'navitem-create-grain').click
    end

    @b.span(:text => arg1).click
end

Then(/^creates a new form$/) do
    @b.button(:text => 'Create new form').when_present.click
end

Then(/^within that form they create "([^"]*)" questions$/) do |arg1|
    @b.div(:class => 'main-content').div(:class => 'grain-container active-grain').iframe(:class => 'grain-frame').element(:id => 'share-form').wait_until_present(120)
    @count = 1
    @count1 = 1

    str_multiple_choice = "m1"

    @b.div(:class => 'main-content').div(:class => 'grain-container active-grain').iframe(:class => 'grain-frame').input(:placeholder => 'Add new question').send_keys str_multiple_choice

    @b.send_keys :enter


    @b.div(:class => 'main-content').div(:class => 'grain-container active-grain').iframe(:class => 'grain-frame').div(:class => 'main-content').form(:id => 'update-prompt-form').div(:class => 'prompt-type-preview').div(:class => 'input-select prompt-type-dropdown').element(:id => 'prompt-type-select').wait_until_present(120)

    @b.div(:class => 'main-content').div(:class => 'grain-container active-grain').iframe(:class => 'grain-frame').div(:class => 'main-content').form(:id => 'update-prompt-form').div(:class => 'prompt-type-preview').div(:class => 'input-select prompt-type-dropdown').select_list(:id => 'prompt-type-select').select 'Multiple Choice'

    while (@count1 <= 3) do

      if (@count1 == 1)
        @b.div(:class => 'main-content').div(:class => 'grain-container active-grain').iframe(:class => 'grain-frame').input(:placeholder => 'Their response could be this option').send_keys "a"
      end

      if (@count1 == 2)
        @b.div(:class => 'main-content').div(:class => 'grain-container active-grain').iframe(:class => 'grain-frame').input(:placeholder => 'Their response could be this option').send_keys "b"
      end

      if (@count1 == 3)
        @b.div(:class => 'main-content').div(:class => 'grain-container active-grain').iframe(:class => 'grain-frame').input(:placeholder => 'Their response could be this option').send_keys "c"
      end

      @b.send_keys :enter

      @count1 = @count1 + 1
    end

    while (@count <= arg1.to_i) do

        str_q = "q" + @count.to_s

        @b.div(:class => 'main-content').div(:class => 'grain-container active-grain').iframe(:class => 'grain-frame').input(:placeholder => 'Add new question').send_keys str_q

        @b.send_keys :enter

        @count = @count + 1

    end



end

Then(/^creates a shareable link$/) do
    sleep 1
    @b.div(:class => 'main-content').div(:class => 'grain-container active-grain').iframe(:class => 'grain-frame').element(:id => 'share-form').when_present.click

    if (@browser == 'chrome')
        @b.send_keys :arrow_right
        @b.send_keys :enter
    end

    if(@browser == 'fire fox')
        @b.body.div(:class => 'popup share').div(:class => 'frame-container align-left').element(:text => 'Get shareable link').when_present.click
    end

    @b.form(:class => 'new-share-token').button.click

    @b.link(:index => 4).wait_until_present
    @answers_url = @b.link(:index => 4).href
    @b.button(:class => 'close-popup').when_present.click

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
      @b1 = Watir::Browser.new :chrome
    end

    @b1.goto @answers_url

    if (@browser == 'fire fox') || (@browser == 'chrome')
        # Close Sign in pop up
        @b1.button(:class => 'close-popup').when_present.click

    end

    if (@browser == 'safari')
        @b1.button(:class => 'incognito-button').when_present.click

    end

end


Then(/^accesses and responds to the newly created questions in a new browser window using "([^"]*)"$/) do | arg1 |

    @b1.div(:class => 'main-content').div(:class => 'grain-container active-grain').iframe(:class => 'grain-frame').form(:id => 'submit-form').div(:class => 'input-field').wait_until_present(120)
    @b1.execute_script("document.getElementById('0').click()")

    @b1.execute_script(%{$("div[class='input-field']:eq(1) input").val('a1')})
    @b1.execute_script(%{$("div[class='input-field']:eq(2) input").val('a2')})

    grain_frame(@b1).button(:id => 'submit-responses').click
end

Then(/^clicks the feedback link$/) do
    @b1.div(:class => 'main-content').div(:class => 'grain-container active-grain').iframe(:class => 'grain-frame').div(:class => 'main-content').element(:text => 'Please give us feedback').click

    sleep 2

    @b1.close

    if @browser1 == 'headless'
      @headless1.destroy
    end

end

Then(/^accesses the responses in the original browser window$/) do
    @b.div(:class => 'main-content').div(:class => 'grain-container active-grain').iframe(:class => 'grain-frame').div(:class => 'navigation__links').element(:text => 'Responses').click

    @b.div(:class => 'main-content').div(:class => 'grain-container active-grain').iframe(:class => 'grain-frame').div(:class => 'main-content').element(:text => "a").wait_until_present
    @b.div(:class => 'main-content').div(:class => 'grain-container active-grain').iframe(:class => 'grain-frame').div(:class => 'main-content').element(:text => "a1").wait_until_present
    @b.div(:class => 'main-content').div(:class => 'grain-container active-grain').iframe(:class => 'grain-frame').div(:class => 'main-content').element(:text => "a2").wait_until_present


end

Then(/^signouts$/) do
    @b.element(:class => 'topbar').ul(:class => 'menubar').element(:class => 'account').click
    @b.button(:class => 'logout').click

end

Then(/^closes the original browser$/) do
    @b.close
    if @browser == 'headless'
      @headless.destroy
    end

end

Then(/^uninstall sandforms$/) do
    @b.link(:text => 'Apps').when_present.click
    @b.button(:text => 'Uninstall...').click
    @b.element(:text => 'SandForms').click
    @b.button(:text => 'Done uninstalling').click

end

Then(/^install Sandforms$/) do
    @b.button(:text => 'Upload app...').wait_until_present

    # webdriver doesn't want to interact with non visible elements...
    @b.execute_script("$('input[type=file]').css('display', 'block')")

    spk = File.expand_path('./sandforms.spk')

    @b.file_field().set(spk)

    # uploadApp comes from sandstorm
    @b.execute_script("uploadApp($('input[type=file]')[0].files[0])")
    @b.button(:text => 'Install SandForms').when_present(120).click

end

Then(/^remove Sandforms if present$/) do
  @b.element(:text => 'Apps').click
  @b.element(:text => 'Install...').wait_until_present

  if @b.element(:text => 'SandForms').exists?
    @b.button(:text => 'Uninstall...').click
    @b.element(:text => 'SandForms').click
    @b.button(:text => 'Done uninstalling').click
  end

end

def grain_frame(browser)
    browser.div(:class => 'main-content').div(:class => 'grain-container active-grain').iframe(:class => 'grain-frame')
end
