import cv2
import numpy as np
import time

from poseModule import PoseDetector



GREEN = (0,220,80)
RED = (0,0,255)



class SquatCounter:


    def __init__(self):

        self.count = 0

        self.stage = "UP"

        self.color = RED


        self.detector = PoseDetector(
            detectionCon=0.6,
            trackCon=0.6
        )



    def calculate_angle(self,a,b,c):


        a=np.array(a)
        b=np.array(b)
        c=np.array(c)



        ab=a-b
        bc=c-b



        denom=np.linalg.norm(ab)*np.linalg.norm(bc)


        if denom==0:

            return 180



        cosine=np.dot(ab,bc)/denom


        cosine=np.clip(
            cosine,
            -1.0,
            1.0
        )


        return np.degrees(
            np.arccos(cosine)
        )




    def update_count(self,angle):


        color=RED



        if angle > 160:


            self.stage="UP"

            color=RED




        elif angle < 120 and self.stage=="UP":


            self.count += 1

            self.stage="DOWN"

            color=GREEN



        self.color=color





    def process(self,frame):


        frame = self.detector.findPose(
            frame,
            False
        )



        lm = self.detector.findPosition(
            frame,
            False
        )



        if lm and len(lm)>28:


            try:


                right_hip = lm[24][1:]

                right_knee = lm[26][1:]

                right_ankle = lm[28][1:]



                knee_angle = self.calculate_angle(

                    right_hip,

                    right_knee,

                    right_ankle

                )



                self.update_count(
                    knee_angle
                )



            except Exception:

                pass



        return self.count