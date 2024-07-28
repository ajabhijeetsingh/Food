import express from "express"
import cors from "cors"
import { connect } from "mongoose"
import connectDB from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"




// app config
const app = express()
const port = 4000


//middleware
app.use(express.json())

app.use(cors(
    {
        // origin: ["https://food-bd69.vercel.app","https://food-tofs.vercel.app"],
        origin: ["*"],
        methods: ["POST","GET"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"]
    }
));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://food-bd69.vercel.app"); // Allow your client domain
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});


//db connection

connectDB();

// api endpoints 

app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter);



app.get("/", (req, res) => {
    res.send("API is Working")
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})

//mongodb+srv://aj_abhijeetsingh:pulsar150@cluster0.1d8wqln.mongodb.net/?
