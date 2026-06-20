import time
import numpy as np

from collections import deque

from poseModule import PoseDetector



# ================= CONFIG (UNCHANGED) =================


ARM_DOWN = 105
ARM_UP = 130


MIN_HIP_MOVE = 12

MIN_REP_GAP = 0.5


KNEE_MIN = 120


SMOOTH_SIZE = 5





class Smoother:


    def __init__(
        self,
        size=SMOOTH_SIZE
    ):

        self.buf = deque(
            maxlen=size
        )



    def update(
        self,
        value
    ):

        if value is None:

            return None


        self.buf.append(value)


        return float(
            np.mean(self.buf)
        )







class PushupCounter:



    def __init__(self):

        self.count = 0

        self.stage = "UP"

        self.last_rep = 0

        self.top_hip = None


        self.detector = PoseDetector(
            detectionCon=0.6,
            trackCon=0.6
        )


        self.smoother = Smoother()






    def update(
        self,
        arm_angle,
        hip_y,
        knee_angle,
        now
    ):


        if (
            arm_angle is None
            or
            hip_y is None
        ):

            return




        if self.top_hip is None:

            self.top_hip = hip_y




        hip_drop = (
            hip_y -
            self.top_hip
        )




        if (

            arm_angle < ARM_DOWN

            and

            hip_drop > MIN_HIP_MOVE

            and

            knee_angle > KNEE_MIN

        ):

            self.stage = "DOWN"





        if arm_angle > ARM_UP:


            if (

                self.stage == "DOWN"

                and

                now-self.last_rep > MIN_REP_GAP

            ):


                self.count += 1

                self.last_rep = now




            self.stage = "UP"

            self.top_hip = hip_y







    # ================= MOBILE FRAME INPUT =================


    def process(
        self,
        frame
    ):



        frame = self.detector.findPose(
            frame,
            False
        )



        lm = self.detector.findPosition(
            frame,
            False
        )



        arm_angle = None

        hip_y = None

        knee_angle = None






        if lm and len(lm) > 28:



            left_arm = self.detector.findAngle(

                frame,

                11,

                13,

                15,

                False

            )



            right_arm = self.detector.findAngle(

                frame,

                12,

                14,

                16,

                False

            )





            if left_arm and right_arm:


                arm_angle = self.smoother.update(

                    (
                        left_arm
                        +
                        right_arm
                    )
                    /
                    2

                )






            hip_y = (

                lm[23][2]

                +

                lm[24][2]

            ) / 2







            left_knee = self.detector.findAngle(

                frame,

                23,

                25,

                27,

                False

            )




            right_knee = self.detector.findAngle(

                frame,

                24,

                26,

                28,

                False

            )





            if left_knee and right_knee:


                knee_angle = (

                    left_knee

                    +

                    right_knee

                ) / 2







        self.update(

            arm_angle,

            hip_y,

            knee_angle,

            time.time()

        )



        return self.count