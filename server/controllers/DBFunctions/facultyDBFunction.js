const Faculty = require('../../models/Faculty')
const textToHash = require('../../utilities/textToHashed')
exports.getFacultyByFacultyEmail = async (data) => {
    try {
        
        const { facultyEmail } = data
        const findFaculty = await Faculty.findOne({ facultyEmail })
        if(!findFaculty)
        {
            return {
                success: false,
                error: 'Faculty with this faculty email does not exist!',
                code: 404
              }
        }
        return {
            success: true,
            facultyData: findFaculty,
            code: 200,
            message: "Faculty found and data returned"
          }

    }
    catch (error) {
        console.log(error)
        return {
            success: false,
            error: 'Server Error',
            code: 500
          }
    
    }

}
exports.getFacultyByID = async (data) => {
    try {
        
        const { facultyID } = data
        const findFaculty = await Faculty.findById(facultyID)
        if(!findFaculty)
        {
            return {
                success: false,
                error: 'Faculty does not exist!',
                code: 404
              }
        }
        return {
            success: true,
            facultyData: findFaculty,
            code:200, 
            message:"Faculty found and data returned"
          }

    }
    catch (error) {
        console.log(error)
        return {
            success: false,
            error: 'Server Error',
            code: 500
          }
    }

}
exports.getAllFaculty = async () => {
    try {
        
        const findFaculty = await Faculty.find({ })
        return {
            success: true,
            facultyData: findFaculty,
            code: 200, 
            message:"All faculty found and data returned"
          }

    }
    catch (error) {
        console.log(error)
        return {
            success: false,
            error: 'Server Error',
            code: 500
          }
    }

}
exports.getFacultyByClubID = async (data) => {
    try {
        
        const { clubID } = data
        const findFaculty = await Faculty.findOne({clubID})
        if(!findFaculty)
        {
            return {
                success: false,
                error: 'No faculty found!',
                code: 404
              }
        }
        return {
            success: true,
            facultyData: findFaculty,
            code:200,
            message: 'Faculty found and data returned'
          }

    }
    catch (error) {
        console.log(error)
        return {
            success: false,
            error: 'Server Error',
            code: 500
          }
    }

}
exports.insertFaculty = async (data) => {
    try
    {
        const { facultyName, facultyEmail, password, phone, clubID } = data
        const findFaculty = await Faculty.findOne({ facultyEmail })
        if(findFaculty)
        {
            return {
                success: false,
                error: 'Faculty with same facultyEmail already exists!',
                code: 400
              }
        }
        
        const hashedPassword = textToHash(password)
        const faculty = new Faculty({
            facultyName, 
            facultyEmail, 
            password: hashedPassword, 
            phone, 
            clubID
            
        })
        const facultyInserted = await faculty.save()
        return {success:true, facultyData:facultyInserted, code:201, message:"Faculty created successfully"}
       
    }
    catch (error) {
        console.log(error)
        return {
            success: false,
            error: 'Server Error',
            code: 500
          }
    }
    
}
exports.updateFacultyByFacultyEmail = async (data) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key!=="facultyID"&&key!=="facultyEmail")
            {
                dataToUpdate[key] = data[key]
            }
        }
        const {facultyEmail} = data
        if(dataToUpdate.password)
        {
          const hashedPassword = textToHash(dataToUpdate.password)
          dataToUpdate.password = hashedPassword

        }
        const findFaculty = await Faculty.findOne({ facultyEmail })
        if(!findFaculty)
        {
            return {
                success: false,
                error: 'Faculty with this email does not exist!',
                code:400
              }
        }
        if(dataToUpdate.facultyEmailNew)
        {
            dataToUpdate.facultyEmail=dataToUpdate.facultyEmailNew
        }
        const facultyUpdated = await Faculty.findOneAndUpdate({ facultyEmail },dataToUpdate,{new:true})
        return {success:true, facultyData:facultyUpdated, code:200, message:"Faculty data updated successfully"}
       
    }
    catch (error) {
        console.log(error)
        return {
            success: false,
            error: 'Server Error',
            code: 500
          }

    }
    
}
exports.updateFacultyByID = async (data) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key!=="facultyID"&&key!=="facultyEmail")
            {
                dataToUpdate[key] = data[key]
            }
        }
        if(dataToUpdate.password)
        {
          const hashedPassword = textToHash(dataToUpdate.password)
          dataToUpdate.password = hashedPassword

        }
        const {facultyID} = data
        const findFaculty = await Faculty.findById( facultyID )
        if(!findFaculty)
        {
            return {
                success: false,
                error: 'Faculty does not exist!',
                code:400
              }
        }
        if(dataToUpdate.facultyEmailNew)
        {
            dataToUpdate.facultyEmail=dataToUpdate.facultyEmailNew
        }
        const facultyUpdated = await Faculty.findByIdAndUpdate(facultyID,dataToUpdate,{new:true})
        return {success:true, facultyData:facultyUpdated, code:200, message:"Faculty data updated successfully"}
       
    }
    catch (error) {
        console.log(error)
        return {
            success: false,
            error: 'Server Error',
            code: 500
          }

    }
    
}


exports.deleteFacultyByFacultyEmail = async (data) => {
    try
    {
        const { facultyEmail } = data
        const findFaculty = await Faculty.findOne({ facultyEmail })
        if(!findFaculty)
        {
            return {
                success: false,
                error: 'Faculty with this facultyEmail does not exist!',
                code:400
              }
        }
        const facultyDeleted = await Faculty.findOneAndDelete({facultyEmail})
        return {success:true, facultyData:facultyDeleted, code:200, message:"Faculty data updated successfully"}       
    }
    catch (error) {
        console.log(error)
        return {
            success: false,
            error: 'Server Error',
            code: 500
          }
    }
    
}

exports.deleteFacultyByID = async (data) => {
    try
    {
        const { facultyID } = data
        const findFaculty = await Faculty.findById( facultyID )
        if(!findFaculty)
        {
            return {
                success: false,
                error: 'Faculty does not exist!',
                code: 400
              }
        }
        const facultyDeleted = await Faculty.findByIdAndDelete(facultyID)
        return {success:true, facultyData:facultyDeleted, code:200, message:"Faculty data updated successfully"}       
    }
    catch (error) {
        console.log(error)
        return {
            success: false,
            error: 'Server Error',
            code: 500
          }
    }
    
}