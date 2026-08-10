const Setting =
require("../../models/Setting");

const asyncHandler =
require("../../utils/asyncHandler");

const updateSettings =
asyncHandler(async (req, res) => {

let settings =
await Setting.findOne();

if (!settings) {

settings =
await Setting.create({});

}

Object.assign(
settings,
req.body
);

await settings.save();

res.status(200).json({

success: true,

message:
"Settings updated successfully",

settings,

});

});

module.exports =
updateSettings;