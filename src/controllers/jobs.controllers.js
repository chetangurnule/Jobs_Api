import { StatusCodes } from "http-status-codes";
import { Job } from "../models/jobs.model.js";
import { NotFoundError, BadRequestError } from "../errors/index.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";

const createJob = asyncHandler(async (req, res) => {
  // get the data from the frontend
  const data = req.body;
  // add the createdBy field
  data.createdBy = req.user._id;
  console.log(req.user);
  //if data is present then enter the data in the database
  const job = await Job.create(data);
  // send the successfull response to the frontend
  res
    .status(StatusCodes.CREATED)
    .json(new ApiResponse(StatusCodes.CREATED, job));
});

const getAllJobs = asyncHandler(async (req, res) => {
  //get the data from the database on the basis of createdBy property and sort it by createdAt property
  const allJobs = await Job.find({ createdBy: req.user._id }).sort("createAt");
  // send the successfull response to the frontend
  res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, allJobs));
});

const getJob = asyncHandler(async (req, res) => {
  // get the data from req object
  const {
    user: { _id: userId },
    params: { id: jobId },
  } = req;
  // search for the job
  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) throw new NotFoundError("job not found with id :" + jobId);
  // send the successful response back to frontend
  res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, job));
});

const updateJob = asyncHandler(async (req, res) => {
  // get the data from req object
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;
  if (!company || !position)
    throw new BadRequestError("company and position fields cannot be empty");
  // search for the job and update it
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    {
      new: true,
      runValidator: true,
    }
  );
  if (!job) throw new NotFoundError(`No job with id ${jobId}`);

  // send successfull response to the frontend
  res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, job));
});

const deleteJob = asyncHandler(async (req, res) => {
  // get the data from the req object
  const {
    user: { _id: userId },
    params: { id: jobId },
  } = req;
  // delete the job from the database
  const deleteRes = await Job.findByIdAndDelete({
    _id: jobId,
    createdBy: userId,
  });

  if (!deleteRes) throw new NotFoundError("No job with id ${jobId}");
  // send successfull response to the frontend
  res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, {}));
});

export { createJob, getAllJobs, getJob, updateJob, deleteJob };
