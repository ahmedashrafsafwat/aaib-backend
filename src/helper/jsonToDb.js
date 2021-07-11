const data = require('../db_backup/reports.json');

const reports = data.elements;

const Report = require('../models/report')

Report.insertMany(reports,{ordered:false},(err,data)=>{

    console.log('data has been generated');
})