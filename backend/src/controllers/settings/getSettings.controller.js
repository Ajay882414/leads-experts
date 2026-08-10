const Setting =
require("../../models/Setting");

const asyncHandler =
require("../../utils/asyncHandler");

const getSettings =
asyncHandler(async (req, res) => {

let settings =
await Setting.findOne();

if (!settings) {

settings =
await Setting.create({});

}

res.status(200).json({

success: true,

settings,

});

});

module.exports =
getSettings;