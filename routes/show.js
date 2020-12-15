const express = require('express');
const File = require('../models/file');
const router = express.Router();

router.get("/:uuid", async(req , res) =>{              // uuid is dynamic parameter

    try {
        const file = await File.findOne({uuid : req.params.uuid});

        if(!file){
        return res.render("download" , {error : "Link has been expired."});
        }

        return res.render('download',{
            uuid : file.uuid,
            fileName: file.fileName,
            fileSize : file.size,
            downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        });

    } catch (error) {
        return res.render("download" , {error : "Something went wrong "});
    }
});                     


module.exports = router;