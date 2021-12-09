// Imports
const Requests = require('../../models/Requests');
// ------------------------------------

// Function to create a new Request
exports.createRequest = async (data, session) => {
  const { rollNo, studentId, clubId } = data;
  try {
    const findRequest = await Requests.findOne({ rollNo, clubId }).session(
      session
    );
    if (findRequest) {
      return {
        success: false,
        code: 400,
        error: 'Request to the Club mentioned already made!',
      };
    } else {
      const createdRequest = await Requests.create(
        [
          {
            rollNo,
            studentId,
            clubId,
          },
        ],
        { session }
      );
      return {
        success: true,
        code: 201,
        message: 'Request to the mentioned Club created!',
        requestData: createdRequest[0],
      };
    }
  } catch (err) {
    return {
      success: false,
      code: 500,
      error: err.message,
    };
  }
};
// ------------------------------------

// Function to get all Requests
exports.getAllRequests = async () => {
  try {
    const findRequest = await Requests.find();
    if (!findRequest) {
      return {
        success: false,
        code: 404,
        error: 'No requests found!',
      };
    } else {
      return {
        success: true,
        code: 200,
        message: 'Requests retrieved successfully!',
        requestData: findRequest,
      };
    }
  } catch (err) {
    return {
      success: false,
      code: 500,
      error: err.message,
    };
  }
};
// ------------------------------------

// Function to get a request using rollNo and clubId
exports.getRequest = async (data) => {
  const { rollNo, clubId } = data;
  try {
    const findRequest = await Requests.findOne({ rollNo, clubId });
    if (!findRequest) {
      return {
        success: flase,
        code: 404,
        error:
          'No request realted to the rollNo and Club of the student found!',
      };
    } else {
      // console.log(findRequest);
      return {
        success: true,
        code: 200,
        message: 'Request found!',
        requestData: findRequest,
      };
    }
  } catch (err) {
    return {
      success: false,
      code: 500,
      error: err.message,
    };
  }
};
// ------------------------------------

// Function to get a request using requestId
exports.getRequestById = async (data) => {
  const { requestId } = data;
  try {
    const findRequest = await Requests.findById(requestId);
    if (!findRequest) {
      return {
        success: flase,
        code: 404,
        error:
          'No request realted to the rollNo and Club of the student found!',
      };
    } else {
      return {
        success: true,
        code: 200,
        message: 'Request found!',
        requestData: findRequest,
      };
    }
  } catch (err) {
    return {
      success: false,
      code: 500,
      error: err.message,
    };
  }
};
// ------------------------------------

// Function to get All request using a rollNo
exports.getAllRequestByRoll = async (data) => {
  const { rollNo } = data;
  try {
    const findRequest = await Requests.find({ rollNo });
    if (!findRequest) {
      return {
        success: flase,
        code: 404,
        error:
          'No request realted to the rollNo and Club of the student found!',
      };
    } else {
      if (findRequest.length === 0) {
        return {
          success: true,
          code: 200,
          message: 'No request with this RollNo found!',
          requestData: [],
        };
      }
      return {
        success: true,
        code: 200,
        message: 'Request found!',
        requestData: findRequest,
      };
    }
  } catch (err) {
    return {
      success: false,
      code: 500,
      error: err.message,
    };
  }
};
// ------------------------------------

// Function to get Request using clubId
exports.getRequestByClubId = async (data) => {
  const { clubId } = data;
  try {
    const findRequest = await Requests.find({ clubId });
    if (!findRequest) {
      return {
        success: flase,
        code: 404,
        error:
          'No request realted to the rollNo and Club of the student found!',
      };
    } else {
      if (findRequest.length === 0) {
        return {
          success: true,
          code: 200,
          message: 'No request with this ClubId found!',
          requestData: [],
        };
      }

      return {
        success: true,
        code: 200,
        message: 'Request found!',
        requestData: findRequest,
      };
    }
  } catch (err) {
    return {
      success: false,
      code: 500,
      error: err.message,
    };
  }
};
// ------------------------------------

// Function to delete a request using rollNo and clubId
exports.deleteRequest = async (data, session) => {
  const { rollNo, studentId, clubId } = data;
  try {
    const findRequest = await Requests.find({ rollNo, clubId }).session(
      session
    );

    if (!findRequest) {
      return {
        success: flase,
        code: 404,
        error:
          'No request realted to the rollNo and Club of the student found!',
      };
    } else {
      const deletedRequest = await Requests.findOneAndDelete({
        rollNo,
        clubId,
      }).session(session);
      return {
        success: true,
        code: 200,
        message: 'Request deleted successfully!',
        requestData: deletedRequest,
      };
    }
  } catch (err) {
    return {
      success: false,
      code: 500,
      error: err.message,
    };
  }
};
// ------------------------------------

// Function to delete a request using requestId
exports.deleteRequestById = async (data, session) => {
  const { requestId } = data;
  try {
    const findRequest = await Requests.findById(requestId).session(session);
    if (!findRequest) {
      return {
        success: flase,
        code: 404,
        error:
          'No request realted to the rollNo and Club of the student found!',
      };
    } else {
      const deletedRequest = await Requests.findByIdAndDelete(
        requestId
      ).session(session);
      return {
        success: true,
        code: 200,
        message: 'Request deleted successfully!',
        requestData: deletedRequest,
      };
    }
  } catch (err) {
    return {
      success: false,
      code: 500,
      error: err.message,
    };
  }
};
// ------------------------------------
