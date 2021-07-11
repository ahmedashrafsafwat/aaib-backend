const  Report  = require('../models/report');
const { successResponse, errorResponse, uniqueId } = require('../helper');
const errorHandler = require('../middlewares/errorHandler').default;


exports.updateTicket = async (req,res, updateType) => {
    try {
        req.assert("reportId", "reportId  can't be empty").notEmpty();

        const errors = req.validationErrors();
      
        // return validation errors
        if (errors) {
          return errorHandler(errors, req, res, next)
        }

        const currentReport = await Report.findOne({"reference.referenceId": req.params.reportId});
        
        if(!currentReport) {
            throw new Error("couldn't find the requested report" );
        }
        if(currentReport.state != 'OPEN') {
            throw new Error('the requested ticket has already been closed' );

        }
        
        const updateResult = await Report.updateMany(
                { 
                    "reference.referenceId": req.params.reportId
                },
                {
                    ticketState: updateType,
                    state: "CLOSED",
                    updated: new Date()
                },
                {
                    "multi": true 
                }
            )

            if (updateResult.nModified >= 1) {
                return successResponse(`Successfully ${updateType} this ticket`, {},200,res);
            } else {
                throw new Error('No tickets has been updated' )
            }
    } catch(error) {
    let message = error.message

    return errorResponse( message,404,{},res)
}
}

exports.getReports = async (req, res) => {
    try {
        
        const result= await Report.find();

        return successResponse("Reports", result,200,res);
        





    } catch (error) {
        let message = error.message
        return errorResponse( message,400,{},res)
    }
  };

