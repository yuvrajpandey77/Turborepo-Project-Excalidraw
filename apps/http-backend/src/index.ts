import express from "express";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from  '@repo/backend-common/config'
import {CreateUserSchema, SigninSchema,CreateRoomSchema} from "@repo/common/types"
import { middleware } from "./middleware";
const app = express();
app.post("/signup", (req, res) => {
  try {
    const data = CreateUserSchema.parse(req.body);
    // db call
    res.json({
      userId: "123"
    });
  } catch (error) {
    res.json({
      message: "Incorrect Inputs"
    });
    return
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

app.post("/room",middleware, (req, res) => {
  try {
    const data = CreateRoomSchema.parse(req.body);
  } catch (error) {
    res.json({
      message: "Incorrect Inputs"
    });
    return
  }
  res.json({
    roomId:123
  })
});






app.listen(3001, () => {
  console.log("Server is running on port 3000");
});