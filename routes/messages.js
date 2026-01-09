const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const Message = require('../models/Message');
const User = require('../models/User');

// Send direct message (admin only)
router.post('/send', adminAuth, async (req, res) => {
  try {
    const { recipientId, subject, content, priority = 'medium' } = req.body;

    if (!recipientId || !subject || !content) {
      return res.status(400).json({ 
        message: 'Recipient, subject, and content are required' 
      });
    }

    // Check if recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    const message = new Message({
      sender: req.user._id,
      recipient: recipientId,
      type: 'direct',
      subject,
      content,
      priority
    });

    await message.save();

    // Populate sender info for response
    await message.populate('sender', 'name email');

    res.status(201).json({
      message: 'Message sent successfully',
      data: message
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error sending message', 
      error: error.message 
    });
  }
});

// Send broadcast message (admin only)
router.post('/broadcast', adminAuth, async (req, res) => {
  try {
    const { subject, content, priority = 'medium', userFilter = {} } = req.body;

    if (!subject || !content) {
      return res.status(400).json({ 
        message: 'Subject and content are required' 
      });
    }

    // Get all users based on filter
    const users = await User.find(userFilter).select('_id');
    
    if (users.length === 0) {
      return res.status(400).json({ message: 'No users found matching the criteria' });
    }

    // Create messages for all users
    const messages = users.map(user => ({
      sender: req.user._id,
      recipient: user._id,
      type: 'broadcast',
      subject,
      content,
      priority
    }));

    const createdMessages = await Message.insertMany(messages);

    res.status(201).json({
      message: `Broadcast sent to ${createdMessages.length} users`,
      count: createdMessages.length
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error sending broadcast', 
      error: error.message 
    });
  }
});

// Get user's messages
router.get('/my-messages', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const unreadOnly = req.query.unread === 'true';

    const query = { recipient: req.user._id };
    if (unreadOnly) query.isRead = false;

    const messages = await Message.find(query)
      .populate('sender', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Message.countDocuments(query);

    res.json({
      messages,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching messages', 
      error: error.message 
    });
  }
});

// Mark message as read
router.put('/:id/read', auth, async (req, res) => {
  try {
    const message = await Message.findOneAndUpdate(
      { _id: req.params.id, recipient: req.user._id },
      { isRead: true, readAt: new Date() },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json({ message: 'Message marked as read' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating message', 
      error: error.message 
    });
  }
});

// Get all messages (admin only)
router.get('/all', adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const type = req.query.type || '';

    const query = {};
    if (type) query.type = type;

    const messages = await Message.find(query)
      .populate('sender', 'name email')
      .populate('recipient', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Message.countDocuments(query);

    res.json({
      messages,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching messages', 
      error: error.message 
    });
  }
});

// Delete message (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting message', 
      error: error.message 
    });
  }
});

module.exports = router;
