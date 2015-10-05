
# HACKING: Conventions and processes for contributing

## Merging strategy

If pairing, push straight to master.

If you are working solo, develop on a short lived branch and then either:

- Get an in person code review and push to master
- Submit a pull request (and maybe ask some people to review)

### What is a short lived branch?

Our branches should only last 1-3 days. Please take care to break up work into
sizable chunks and submit pull requests or get code reviews incrementally.
It shouldn't take more than an hour for someone to review your code/PR.

### What if nobody comments on my PR?

You should try and get other people to look at it. But if nobody has had a chance
to review it in two days, go ahead and merge it.

### Who reviews code?

Everybody! Please take some time whenever you sit down to work on the project
to check for any outstanding pull requests and review them. You definitely do
not have to wait for everyone to see your pull request before merging though.

## Criteria For Including Third Party Code

* is the license compatible with Apache 2.0?
* does it reach out to third party servers? (eg using apis or loading resources client side) if so it's a no-go
* can we include it using dependency management tools? (preferably the built in meteor package system https://atmospherejs.com/)
* is it an active project? when was the last commit?
* how healthy is the project? number of stars on github, number of contributors, etc
* what does the issues list look like? no issues at all could be bad, as could tons of issues that never get answered. especially **look for open security issues**

## Changing Permissions in dev mode

There are two user types: owners and non-owners
- Owners can create form & review submissions
- Non-owners can review prompts & submit submissions

To change user permissions in dev mode (running with `meteor`), change the `STUB_PERMISSIONS` environment variable to `"owner"` or `""` by starting Meteor like so: `STUB_PERMISSIONS="" meteor run`

**Note:** If you already had the browser open, 
[clear your browser's local storage](http://stackoverflow.com/a/9404841/5270598).
Hard refreshing is not sufficient.
