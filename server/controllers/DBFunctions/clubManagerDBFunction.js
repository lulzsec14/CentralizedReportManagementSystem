const ClubManagers = require('../../models/ClubManagers');
const textToHash = require('../../utilities/textToHashed')
exports.getClubManagerByID = async (data,session) => {
    try {
        
        const { clubManagerID } = data
        const findClubManager = await ClubManagers.findById( clubManagerID ).session(session)
        if(!findClubManager)
        {
            return {
                success: false,
                error: 'Club Manager does not exist!',
                code: 404
              }
        }
        return {
            success: true,
            clubManagerData: findClubManager,
            code: 200, 
            message:"Club Manager found and data returned"
          }

    }
    catch (error) {
        console.log(error)
        return {
          success: false,
          code:500,
          error:'Server Error'
        };
      }

}
exports.getClubManagerByRollNo = async (data,session) => {
    try {
        
        const { studentRollNo } = data
        const findClubManager = await ClubManagers.findOne({studentRollNo}).session(session)
        if(!findClubManager)
        {
            return {
                success: false,
                error: 'Club Manager does not exist!',
                code: 404
              }
        }
        return {
            success: true,
            clubManagerData: findClubManager,
            code: 200, 
            message:"Club Manager found and data returned"
          }

    }
    catch (error) {
        console.log(error)
        return {
          success: false,
          code:500,
          error:'Server Error'
        };
      }

}
exports.getClubManagersByClubID = async (data,session) => {
    try {
        
        const { clubID } = data;
        const findClubManagers = await ClubManagers.find({ clubID }).session(session)
        if(!findClubManagers)
        {
            return {
                success: false,
                error: 'There are no Club Managers!',
                code: 404
              }
        }
        return {
            success: true,
            clubManagerData: findClubManagers,
            code: 200, 
            message:"Club Managers found and data returned"
          }

    }
    catch (error) {
        console.log(error)
        return {
          success: false,
          code:500,
          error:'Server Error'
        };
      }

}
exports.insertClubManager = async (data,session) => {
    try
    {
        const { studentRollNo, clubID, password, role } = data
        const findClubManager = await ClubManagers.findOne({ studentRollNo }).session(session)
        if(findClubManager)
        {
            return {
                success: false,
                error: 'Club Manager of this roll number already exists!',
                code:400
              }
        }
        const hashedPassword = textToHash(password)
        const ClubManager = new ClubManagers({
            studentRollNo, 
            clubID, 
            password: hashedPassword, 
            role
        })
        const clubManagerInserted = await ClubManager.save({session})
        return { success:true, clubManagerData:clubManagerInserted, code:201, message:"Club Manager created successfully"}
       
    }
    catch (error) {
    console.log(error)
    return {
      success: false,
      code:500,
      error:'Server Error'
    };
  }
    
}
exports.updateClubManagerByRollNo = async (data,session) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key!=="clubManagerID"&&key!=="studentRollNo"&&key!=="clubID"&&key!=="role")
            {
                dataToUpdate[key] = data[key]
            }
        }
        const {studentRollNo} = data
        if(dataToUpdate.password)
        {
          const hashedPassword = textToHash(dataToUpdate.password)
          dataToUpdate.password = hashedPassword

        }
        const findClubManager = await ClubManagers.findOne({ studentRollNo }).session(session)
        if(!findClubManager)
        {
            return {
                success: false,
                error: 'Club Manager with this roll number does not exist!',
                code:400
              }
        }
        const clubManagerUpdated = await ClubManagers.findOneAndUpdate({ studentRollNo },dataToUpdate,{new:true}).session(session)
        return {success:true, clubManagerData:clubManagerUpdated, code:200, message:"Club Manager data updated successfully"}
       
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
exports.updateClubManagerByID = async (data,session) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key!=="clubManagerID"&&key!=="studentRollNo"&&key!=="clubID"&&key!=="role")
            {
                dataToUpdate[key] = data[key]
            }
        }
        const {clubManagerID} = data
        if(dataToUpdate.password)
        {
          const hashedPassword = textToHash(dataToUpdate.password)
          dataToUpdate.password = hashedPassword

        }
        const findClubManager = await ClubManagers.findById( clubManagerID ).session(session)
        if(!findClubManager)
        {
            return {
                success: false,
                error: 'Club Manager does not exist!',
                code:404
              }
        }
        
        const clubManagerUpdated = await ClubManagers.findByIdAndUpdate(clubManagerID,dataToUpdate,{new:true}).session(session)
        return {success:true,clubManagerData:clubManagerUpdated,code:200, message:"Club Manager updated successfully"}
       
    }
    catch (error) {
        console.log(error)
        return {
          success: false,
          code:500,
          error:'Server Error'
        };
      }
    
}

exports.updateClubManagerArrayByRollNo = async (data,session) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key==="taskList")
            {
                dataToUpdate[key] = data[key]
            }
        }
        const {studentRollNo} = data
        const findClubManager = await ClubManagers.findOne({ studentRollNo }).session(session)
        if(!findClubManager)
        {
            return {
                success: false,
                error: 'Club Manager does not exist!',
                code: 404
              }
        }
        const clubManagerUpdated = await ClubManagers.findOneAndUpdate({ studentRollNo },{ $addToSet: dataToUpdate },{new:true}).session(session)
        return {success:true,clubManagerData:clubManagerUpdated,code:201,message:"Data inserted successfully in Club Manager array"}
       
    }
    catch (error) {
    console.log(error)
    return {
      success: false,
      code:500,
      error:'Server Error'
    };
  }
    
}
exports.updateClubManagerArrayByID = async (data,session) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key==="taskList")
            {
                dataToUpdate[key] = data[key]
            }
        }
        const {clubManagerID} = data
        const findClubManager = await ClubManagers.findById( clubManagerID ).session(session)
        if(!findClubManager)
        {
            return {
                success: false,
                error: 'Club Manager does not exist!',
                code:404
              }
        }
        const clubManagerUpdated = await ClubManagers.findByIdAndUpdate(clubManagerID,{ $addToSet: dataToUpdate },{new:true}).session(session)
        return {success:true,clubManagerData:clubManagerUpdated,code:201,message:"Data inserted successfully in Club Manager array"}
       
    }
    catch (error) {
        console.log(error)
        return {
          success: false,
          code:500,
          error:'Server Error'
        };
      }
    
}

exports.deleteFromClubManagerArrayByID = async (data,session) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key==="taskList")
            {
                dataToUpdate[key] = data[key]
            }
        }
        const {clubManagerID} = data
        const findClubManager = await ClubManagers.findById(clubManagerID).session(session)
        if(!findClubManager)
        {
            return {
                success: false,
                error: 'Club Manager does not exist!',
                code: 404
              }
        }
        const clubManagerUpdated = await ClubManagers.findByIdAndUpdate(
            clubManagerID, 
            { $pull: dataToUpdate },
            { safe: true, multi: true,new:true }
          ).session(session);
        return {success:true,clubManagerData:clubManagerUpdated,code:200,message:"Data deleted successfully from Club Manager array"}
       
    }
    catch (error) {
    console.log(error)
    return {
      success: false,
      code:500,
      error:'Server Error'
    };
  }
    
}
exports.deleteFromClubManagerArrayByRollNo = async (data,session) => {
    try
    {
        const dataToUpdate = {}
        for(key in data)
        {
            if(key==="taskList")
            {
                dataToUpdate[key] = data[key]
            }
        }
        const {studentRollNo} = data
        const findClubManager = await ClubManagers.findOne({ studentRollNo }).session(session)
        if(!findClubManager)
        {
            return {
                success: false,
                error: 'Club Manager does not exist!',
                code: 404
              }
        }
        const clubManagerUpdated = await ClubManagers.findOneAndUpdate(
            { studentRollNo },
            { $pull: dataToUpdate },
            { safe: true, multi: true,new:true }
          ).session(session);
        return {success:true,clubManagerData:clubManagerUpdated,code:200,message:"Data deleted successfully from Club Manager array"}
       
    }
    catch (error) {
    console.log(error)
    return {
      success: false,
      code:500,
      error:'Server Error'
    };
  }
    
}

exports.deleteClubManagerByRollNo = async (data,session) => {
    try
    {
        const { studentRollNo } = data
        const findClubManager = await ClubManagers.findOne({ studentRollNo }).session(session)
        if(!findClubManager)
        {
            return {
                success: false,
                error: 'Club Manager does not exist!',
                code: 404
              }
        }
        const clubManagerDeleted = await ClubManagers.findOneAndDelete({studentRollNo}).session(session)
        return {success:true,clubManagerData:clubManagerDeleted,code:200,message:"Club Manager deleted successfully"}       
    }
    catch (error) {
    console.log(error)
    return {
      success: false,
      code:500,
      error:'Server Error'
    };
  }
    
}
exports.deleteClubManagerByID = async (data,session) => {
    try
    {
        const { clubManagerID } = data
        const findClubManager = await ClubManagers.findById( clubManagerID ).session(session)
        if(!findClubManager)
        {
            return {
                success: false,
                error: 'Club Manager does not exist!',
                code: 404,
              }
        }
        const clubManagerDeleted = await ClubManagers.findByIdAndDelete(clubManagerID).session(session)
        return {success:true,clubManagerData:clubManagerDeleted,code:200,message:"Club Manager deleted successfully"}       
    }
    catch (error) {
    console.log(error)
    return {
      success: false,
      code:500,
      error:'Server Error'
    };
  }
    
}
exports.deleteClubManagersByClubID = async (data,session) => {
    try {
      const { clubID } = data;
      const clubManagersDeleted = await ClubManagers.deleteMany({ clubID }).session(session);
      return { success: true, clubManagerData: clubManagersDeleted, code:200, message:"Club Managers deleted successfully" };
    } 
    catch (error) {
      console.log(error)
      return {
        success: false,
        code:500,
        error:'Server Error'
      };
    }
  };