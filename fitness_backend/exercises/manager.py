from .jumpingjack import JumpingJackCounter
from .squat import SquatCounter
from .pushup import PushupCounter


def get_counter(exercise):

    if exercise == "pushup":

        return PushupCounter()

    if exercise == "squat":

        return SquatCounter()

    if exercise == "jumpingjack":

        return JumpingJackCounter()

    return None


def process_frame(counter, frame):

    if counter is None:

        return 0

    return counter.process(frame)
