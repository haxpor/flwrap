# flwrap
flwrap is thin layer wrapping around [Fastlane](https://github.com/fastlane/fastlane) to make execution on command easier.

This project is based off from Fastlane version `2.22.0.`

# Overview

It aims to be just a wrapper to execute Fastlane based commands. Most of the functionality provided by Fastlane already but by having a wrapper will give us room for enhancement or improvement later if needed.

# Install

`npm install -g flwrap`

# Commands

Execute `flwrap -h` to see usage instructions with all possible parameters to use.

# Workflow

* Developer created an Xcode project
* Integrate such project with Fastlane (thus with custom Fastfile)
	* Make sure to set `ENV["DEVELOPER_DIR"] = '/Volumes/Main/Applications/Xcode8.3/Xcode.app/Contents/Developer'` in which it points to a desire Xcode version you want to build with this project. Otherwise, it will use default one automatically as can be retrieved by `xcode-select`.
* Execute command to build project 1:1 `flwrap --project-dir /Users/your-project-dir --fastlane-lane beta`

# License
This project is based on [MIT](https://github.com/haxpor/flwrap/blob/master/LICENSE) license.
