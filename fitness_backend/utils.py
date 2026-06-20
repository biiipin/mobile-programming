import numpy as np


def calculate_angle(a, b, c):

    a = np.array(a)
    b = np.array(b)
    c = np.array(c)


    ab = a - b
    bc = c - b


    denom = (
        np.linalg.norm(ab) *
        np.linalg.norm(bc)
    )


    if denom == 0:
        return 180



    cosine = np.dot(ab, bc) / denom


    cosine = np.clip(
        cosine,
        -1.0,
        1.0
    )


    return np.degrees(
        np.arccos(cosine)
    )