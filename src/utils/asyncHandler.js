const asyncHandler = (func) => {
  return async (req, res) => {
    try {
      await func(req, res);
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: error.message, err: error });
    }
  };
};

export default asyncHandler;
