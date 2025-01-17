const User = require("../models/user-model")

const register = async (req,res) => {
    try {
        console.log(req.body)
        const {username,email,phone,password} = req.body

        const userExist = await User.findOne({email})

        if(userExist){
            return res.status(400).json({message:"email aleady exists"})
        }

        const userCreated = await User.create({username,email,phone,password})
        
        res.status(201).json({
            msg:"registration Succcessfull",
            token: await userCreated.generateToken(), 
            userId:userCreated._id.toString(),});

    } catch (error) {
        res.status(500).json("internal server error")
    }
}

//user logic

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const userExist = await User.findOne({ email });
  
      if (!userExist) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // const user = await bcrypt.compare(password, userExist.password);
      const isPasswordValid = await userExist.comparePassword(password);
      
      if (isPasswordValid) {
        res.status(200).json({
          message: "Login Successful",
          token: await userExist.generateToken(),
          userId: userExist._id.toString(),
        });
      } else {
        res.status(401).json({ message: "Invalid email or passord " });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  const user = async (req, res) => {
    try {
      const userData = req.user;
      console.log(userData);
      return res.status(200).json({ userData });
    } catch (error) {
      console.log(`error from the user route ${error}`);
    }
  };
  

module.exports = {register,login,user}
