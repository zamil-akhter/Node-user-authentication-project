const createOneUser = async (model, data) => {
  try {
    
    const insertedUser = await model.create(data);
    return insertedUser;

  } catch (error) {
    console.log("Error while inserting a new USer", error);
    throw error;
  }
};

module.exports = {
  createOneUser,
};
