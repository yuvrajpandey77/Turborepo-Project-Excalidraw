import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common/config'
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types"
import { middleware } from "./middleware";
import { prismaClient } from "@repo/db/client";
const app = express();
app.post("/signup",async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect Inputs"
    });
    return
  }
  try{
    await prismaClient.user.create({
      data:{
        email: parsedData.data?.username,
        password: parsedData.data.password,
        name: parsedData.data.name
      }
    })

    res.json({
      userId: "123"
    });

  }catch(e){
    res.status(411).json({
      message: "User Already Exist!"
    })
  }
  

});

app.post("/signin", (req, res) => {
  res.send("Hello World signin");
  try {
    const data = SigninSchema.parse(req.body);
  } catch (error) {
    res.json({
      message: "Incorrect Inputs"
    });
    return
  }


  const userId = 1;
  const token = jwt.sign({
    userId
  }, JWT_SECRET);
  res.json({ token });
});

app.post("/room", middleware, (req, res) => {
  try {
    const data = CreateRoomSchema.parse(req.body);
  } catch (error) {
    res.json({
      message: "Incorrect Inputs"
    });
    return
  }
  res.json({
    roomId: 123
  })
});






app.listen(3001, () => {
  console.log("Server is running on port 3001");
});