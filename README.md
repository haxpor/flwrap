# flwrap
flwrap is thin layer wrapping around [Fastlane](https://github.com/fastlane/fastlane) to make execution on command easier.

This project is based off from Fastlane version `2.28.9.`

# Overview

It aims to be just a wrapper to execute Fastlane based commands. Most of the functionality provided by Fastlane already but by having a wrapper will give us room for enhancement or improvement later if needed.

# Install

`npm install -g flwrap`

# Commands

Execute `flwrap -h` to see usage instructions with all possible parameters to use.

# Workflow

* Developer created an Xcode project
* Integrate such project with Fastlane (thus with custom Fastfile)
	* Normally you did it with `fastlane` command. Consult [fastlane doc](https://docs.fastlane.tools/) for how to integrate with your Xcode project.
	* You can also take a look at example fastlane configuration files at [example/](https://github.com/haxpor/flwrap/tree/master/example). Notice line with `# TODO: ...` as you specify your values in there.
	* Make sure to set `ENV["DEVELOPER_DIR"] = '/Volumes/Main/Applications/Xcode8.3/Xcode.app/Contents/Developer'` in which it points to a desire Xcode version you want to build with this project. Otherwise, it will use default one automatically as can be retrieved by `xcode-select`.
* Execute command to build project `flwrap --project-dir /Users/your-project-dir --fastlane-lane beta`
* Better yet you can use above command to hook it up with your `cron` job to make it build periodically especially to extend testing period, or up to your CI setup.

# License
This project is based on [MIT](https://github.com/haxpor/flwrap/blob/master/LICENSE) license.
