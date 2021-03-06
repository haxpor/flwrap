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

1. Developer created an Xcode project
2. If you use `cocoapod` then you should be creating `Podfile` and already executed `pod install` at this point.
    As this will allow it to create workspace project file for you.
3. Integrate project with Fastlane (thus with custom Fastfile)
	* Normally you did it with `fastlane init` and it's just enough. Answer interactive questions that might ask during executing of such command. You can also consult [fastlane doc](https://docs.fastlane.tools/) for how to integrate with your Xcode project.
	* Modify fastlane configuration files especially `Fastfile`.
        * See [example/](https://github.com/haxpor/flwrap/tree/master/example). Notice line with `# TODO: ...` as you specify your values in there.
	    * Make sure to set `ENV["DEVELOPER_DIR"] = '/Volumes/Main/Applications/Xcode8.3/Xcode.app/Contents/Developer'` in which it points to a desire Xcode version you want to build with this project. Otherwise, it will use default one automatically as can be retrieved by `xcode-select`.
4. Execute command to build project `flwrap --project-dir /Users/your-project-dir --fastlane-lane beta`
5. Better yet you can use above command to hook it up with your `cron` job to make it build periodically especially to extend testing period, or up to your CI setup.

# Recommended Project Setting

Here is recommended advice to properly configure your Xcode project, and project repository in general to work with automated Fastlane's configuration file (Fastfile).

* Enable agvtool by setting `Current Project Version` to `1` for new project, and change `Versioning System` to `Apple Generic` under Xcode's `Build Settings`. This will make sure that `commit_version_bump` in Fastlane will work properly. See more information [here](https://developer.apple.com/library/content/qa/qa1827/_index.html).
	
	> You might have to execute `agvtool new-version -all <version>` in case you have exsiting Xcode project that is uploaded to Testflight or App Store already and now you need to automate building process. `<version>` is the current build number you have on Testflight or App Store. This command ensure that your project will have only an only single version number, and will work properly when build with Fastlane.

* Include the following lines in `.gitignore` to exclude build artifacts from building process

    ```
    *.dSYM.zip
    *.ipa
    report.xml
    ```
* Set `App Uses Non-Exempt Encryption` as a new key to project's `Info.plist` file with value of type `Boolean` as `NO`. This is to avoid manual confirmation as you need to log in on iTunes connect website then click to resolve such issue. Doing this will safely avoid that and makes it automated.

# License
This project is based on [MIT](https://github.com/haxpor/flwrap/blob/master/LICENSE) license.
