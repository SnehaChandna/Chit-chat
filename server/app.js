const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors =require("cors");
const io=require('socket.io')(8080,{
    cors
})

//connect DB
require('./db/connection');


//Import models
const Users = require('./models/Users');
const Conversations= require('./models/Conversations');
const Messages= require('./models/Messages');

// app Use
const app = express();
app.use(cors({
    origin: "*", // Allow only requests from this domain
    methods: ['GET', 'POST',"DELETE","PUSH"], // Specify allowed methods
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

// Routes
app.get('/', (req, res) => {
    res.send('Welcome');
})

app.post('/api/register', async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;
        
        if(!fullName|| !email || !password){
            res.status(400).send('please fill all required fields');   
        }else{
            const isAlreadyExist = await Users.findOne({email});
            if(isAlreadyExist){
                res.status(400).send('User already exists');
            }else{
                const newUser =new Users({fullName,email});
                bcryptjs.hash(password,10, (err, hashedPassword)=>{
                    newUser.set('password', hashedPassword);
                    newUser.save();
                })
                return res.status(200).json({ message: 'User registered successfully' });            }
        }
    } catch (error) {
        
    }
})
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for missing email or password
        if (!email || !password) {
            return res.status(400).json({ error: 'Please fill all required fields' });
        }

        // Check if the user exists
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User email or password is incorrect' });
        }

        // Compare the provided password with the stored hashed password
        const validateUser = await bcryptjs.compare(password, user.password);
        if (!validateUser) {
            return res.status(400).json({ error: 'User email or password is incorrect' });
        }

        // Prepare the payload for JWT
        const payload = {
            userId: user._id,
            email: user.email
        };

        // Define the JWT secret key
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'THIS_IS_A_JWT_SECRET_KEY';

        // Sign the JWT and return the response
        jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 84600 }, async (err, token) => {
            if (err) {
                return res.status(500).json({ error: 'Error generating token' });
            }

            // Update the user with the generated token
            await Users.updateOne({ _id: user._id }, {
                $set: { token }
            });

            return res.status(200).json({
                user: { id:user._id, email: user.email, fullName: user.fullName },
                token
            });
        });
    } catch (error) {
        // Handle any server-side errors
        return res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

app.post('/api/conversations', async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const newConversation = new Conversations({ members: [senderId, receiverId] });
        await newConversation.save();
        res.status(200).json({ message: 'Conversation created successfully', conversationId: newConversation._id });
    } catch (error) {
        console.log(error, 'Error');
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/conversations/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const conversations = await Conversations.find({ members: { $in: [userId] } });
        const conversationUserData = await Promise.all(conversations.map(async (conversation) => {
            const receiverId = conversation.members.find((member) => member !== userId);
            const user = await Users.findById(receiverId);
            return { user: { email: user.email, fullName: user.fullName }, conversationId: conversation._id };
        }));
        res.status(200).json(conversationUserData);
    } catch (error) {
        console.log(error, 'Error');
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/message', async (req, res) => {
    try {
        const { conversationId, senderId, message, receiverId = '' } = req.body;
        if (!senderId || !message) {
            return res.status(400).json({ error: 'Please fill all required fields' });
        }
        if (!conversationId && receiverId) {
            const newConversation = new Conversations({ members: [senderId, receiverId] });
            await newConversation.save();
            const newMessage = new Messages({ conversationId: newConversation._id, senderId, message });
            await newMessage.save();
            return res.status(200).json({ message: 'Message sent successfully', conversationId: newConversation._id, messageId: newMessage._id });
        } else if (!conversationId && !receiverId) {
            return res.status(400).json({ error: 'Please fill all required fields' });
        }
        const newMessage = new Messages({ conversationId, senderId, message });
        await newMessage.save();
        res.status(200).json({ message: 'Message sent successfully', messageId: newMessage._id });
    } catch (error) {
        console.log(error, 'Error');
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/message/:conversationId', async (req, res) => {
    try {
        const conversationId = req.params.conversationId;
        if(conversationId== 'new') return res.status(200).json([])
        const messages = await Messages.find({ conversationId });
        const messageUserData = Promise.all(messages.map(async (message) => {
            const user = await Users.findById(message.senderId);
            return { user: { id:user._id,email: user.email, fullName: user.fullName }, message: message.message };
        }));
        res.status(200).json(await messageUserData);
    } catch (error) {
        console.log('Error', error)
    }
  })
  
app.get('/api/users', async (req, res) => {
    try {
      const users = await Users.find();
      const usersData = Promise.all(users.map(async (user) => {
        return { user: { email: user.email, fullName: user.fullName }, userId: user._id };
      }))
      res.status(200).json(await usersData);
    } catch(error){
        console.log('error',error)
    }
})

app.listen(port, ()=> {
    console.log('Listening on port ' + port);
})