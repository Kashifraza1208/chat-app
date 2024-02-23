const catchAsyncError = require("../middleware/catchAsyncError");
const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const { getReceiverSocketId, io } = require("../socket/socket");

//sending message
exports.sendMessage = catchAsyncError(async (req, res, next) => {
  const { message } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id; //currently authenticated user added in the autheticated middleware

  //find conversation between these two user

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    //null means conversation first time
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
      //message will be null initailly
    });
  }

  //create new message and push into conversation message array
  const newMessage = new Message({
    senderId,
    receiverId,
    message,
  });

  if (newMessage) {
    conversation.messages.push(newMessage._id);
  }

  // one by one run so will take time
  // await conversation.save();
  // await newMessage.save();

  //it will run both on same time
  await Promise.all([conversation.save(), newMessage.save()]);

  //socket funcitonality

  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  res.status(201).json(newMessage);
});

// get message between two user
exports.getMessages = catchAsyncError(async (req, res, next) => {
  const { id: userToChat } = req.params;
  const senderId = req.user._id;
  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, userToChat] },
  }).populate("messages"); // I know conversation contain only messae id arrray but i want whole message we i populate

  if (!conversation) {
    return res.status(200).json([]);
  }
  const messages = conversation.messages;
  res.status(200).json(messages);
});
