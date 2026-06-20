from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

import cv2
import os


from exercises.manager import process_frame, get_counter





app = FastAPI(
    title="Gym Counter API"
)





app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)









@app.get("/")
def home():

    return {

        "message":"Gym Counter Backend Running"

    }









@app.get("/health")
def health():

    return {

        "status":"running"

    }









@app.post("/api/count/{exercise}")
async def count_rep(

    exercise:str,

    file:UploadFile = File(...)

):


    try:


        exercise = exercise.lower()





        allowed = [

            "pushup",

            "squat",

            "jumpingjack",

            "skipping"

        ]





        if exercise not in allowed:


            return JSONResponse(

                {

                    "error":"Invalid exercise"

                },

                status_code=400

            )









        # ==========================
        # CREATE NEW COUNTER
        # ==========================


        counter = get_counter(exercise)



        if counter is None:


            return JSONResponse(

                {

                    "error":"Counter not found"

                },

                status_code=400

            )









        # ==========================
        # SAVE VIDEO
        # ==========================


        video_path = "temp_video.mp4"





        video_bytes = await file.read()





        with open(video_path,"wb") as f:

            f.write(video_bytes)









        # ==========================
        # READ VIDEO
        # ==========================


        cap = cv2.VideoCapture(

            video_path

        )





        if not cap.isOpened():


            return JSONResponse(

                {

                    "error":"Cannot open video"

                },

                status_code=400

            )









        count = 0





        while True:



            success, frame = cap.read()





            if not success:

                break







            frame = cv2.resize(

                frame,

                (640,480)

            )









            count = process_frame(

                counter,

                frame

            )









        cap.release()









        if os.path.exists(video_path):

            os.remove(video_path)









        return {


            "exercise": exercise,


            "count": count


        }









    except Exception as e:



        return JSONResponse(

            {

                "error":str(e)

            },

            status_code=500

        )