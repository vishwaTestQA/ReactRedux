import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginAuth = async (req, res) => {
//   Simulate a login authentication process

  const { username, password } = req?.body;

  if(!username || !password){
    return res.status(400).json({ message: 'Username and password are required' });
  }

  

  // For demonstration, let's assume any username and password is valid
  if (username && password) {
    res.status(200).json({ message: 'Login successful', user: { username } });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
res.json({message: "initial sucess"})
}