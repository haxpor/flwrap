module.exports = function() {
	return `###################### More Options ######################
# If you want to have even more control, check out the documentation
# https://github.com/fastlane/fastlane/blob/master/deliver/Deliverfile.md


###################### Automatically generated ######################
# Feel free to remove the following line if you use fastlane (which you should)

# TODO: Change app_identifier, and username to match your information
app_identifier "com.yourdomain.app" # The bundle identifier of your app
username "yourid@yourdomain.com" # your Apple ID user

submission_information({
    export_compliance_uses_encryption: true,
    export_compliance_is_exempt: true
})
`;
}();