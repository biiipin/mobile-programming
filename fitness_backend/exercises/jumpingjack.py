import cv2
import time
import sys, os

sys.path.insert(
    0,
    os.path.dirname(os.path.dirname(__file__))
)

from poseModule import PoseDetector



# ================= CONFIG (UNCHANGED) =================

ARM_OPEN_THRESH = 80
ARM_CLOSE_THRESH = 50

LEG_OPEN_RATIO = 0.75
LEG_CLOSE_RATIO = 0.55

VIS_THRESH = 0.55
COOLDOWN_SEC = 0.4


REQUIRED_LANDMARKS = [
    11,12,
    15,16,
    23,24,
    27,28
]





# ================= COUNTER =================


class JumpingJackCounter:


    def __init__(self):

        self.count = 0

        self.stage = None

        self.last_count_t = 0.0


        self.detector = PoseDetector(
            detectionCon=0.7,
            trackCon=0.7,
            smoothing_alpha=0.4
        )





    def update(
        self,
        arm_angle,
        leg_ratio,
        now
    ):


        if arm_angle is None or leg_ratio is None:

            return



        arms_open = arm_angle > ARM_OPEN_THRESH

        arms_close = arm_angle < ARM_CLOSE_THRESH


        legs_open = leg_ratio > LEG_OPEN_RATIO

        legs_close = leg_ratio < LEG_CLOSE_RATIO




        open_score = (
            1 if arms_open else 0
        ) + (
            1 if legs_open else 0
        )



        close_score = (
            1 if arms_close else 0
        ) + (
            1 if legs_close else 0
        )





        if open_score == 2 and self.stage != "open":

            self.stage = "open"




        elif close_score == 2 and self.stage == "open":


            if (
                now - self.last_count_t
                >= COOLDOWN_SEC
            ):

                self.stage = "closed"

                self.count += 1

                self.last_count_t = now







    def reset(self):

        self.__init__()





    # ================= MOBILE/BACKEND INPUT =================


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




        if lm:


            visible = self.detector.areVisible(
                REQUIRED_LANDMARKS,
                VIS_THRESH
            )



            if visible:


                arm_angle = get_arm_angle(
                    self.detector,
                    frame
                )



                leg_ratio = get_leg_ratio(
                    self.detector
                )



                self.update(

                    arm_angle,

                    leg_ratio,

                    time.time()

                )




        return self.count







# ================= CALCULATIONS =================



def get_arm_angle(
    detector,
    img
):


    left = detector.findAngle(
        img,
        23,
        11,
        15,
        False
    )


    right = detector.findAngle(
        img,
        24,
        12,
        16,
        False
    )



    if left is None or right is None:

        return None



    return (
        left + right
    ) / 2







def get_leg_ratio(
    detector
):


    l_shoulder = detector.getPoint(11)

    r_shoulder = detector.getPoint(12)


    l_ankle = detector.getPoint(27)

    r_ankle = detector.getPoint(28)




    if not (
        l_shoulder
        and r_shoulder
        and l_ankle
        and r_ankle
    ):

        return None





    shoulder_width = max(

        abs(
            l_shoulder[0]
            -
            r_shoulder[0]
        ),

        1

    )



    ankle_gap = abs(

        l_ankle[0]
        -
        r_ankle[0]

    )



    return (
        ankle_gap /
        shoulder_width
    )