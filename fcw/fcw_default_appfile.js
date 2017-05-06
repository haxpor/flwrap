module.exports = function() {
	return `# TODO: Change to your app identifier
app_identifier "com.yourdomain.appname" # The bundle identifier of your app

# TODO: Change to your team ID
apple_id "name@yourdomain.com" # Your Apple email address

# TODO: Change it to your team ID
team_id "XXXXXXXXXX" # Developer Portal Team ID

# you can even provide different app identifiers, Apple IDs and team names per lane:
# More information: https://github.com/fastlane/fastlane/blob/master/fastlane/docs/Appfile.md
`;
}();