const mongoose = require("mongoose")

const schema = mongoose.Schema({
	_id: {type: String, unique:true  },
	source: String,
  sourceIdentityId: String,
  reference: {
    referenceId: String,
    referenceType: String
  },
  state:String,
  payload: {
    source: String,
    reportType: String,
    message:String,
    reportId: String,
    referenceResourceId: String,
    referenceResourceType: String
  },
  ticketState: String,
  created: Date,
  updated: Date
},{ timestamps: false })

module.exports = mongoose.model("Reports", schema)