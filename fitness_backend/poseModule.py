import cv2
import mediapipe as mp
import numpy as np


class PoseDetector:
    def __init__(
        self,
        mode=False,
        modelComplexity=1,
        smooth=True,
        detectionCon=0.5,
        trackCon=0.5,
        smoothing_alpha=0.5
    ):
        self.mpDraw = mp.solutions.drawing_utils
        self.mpPose = mp.solutions.pose

        self.pose = self.mpPose.Pose(
            static_image_mode=mode,
            model_complexity=modelComplexity,
            smooth_landmarks=smooth,
            min_detection_confidence=detectionCon,
            min_tracking_confidence=trackCon
        )

        self.results = None

        self.lmList = []
        self.lm_map = {}
        self.visibility = {}
        self.norm_map = {}
        self.lm3d = {}

        # EMA smoothing
        self.alpha = smoothing_alpha
        self.prev = {}

    # ─── POSE DETECTION ───────────────────────────────────────────────────────
    def findPose(self, img, draw=True):
        imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        self.results = self.pose.process(imgRGB)

        if self.results and self.results.pose_landmarks and draw:
            self.mpDraw.draw_landmarks(
                img,
                self.results.pose_landmarks,
                self.mpPose.POSE_CONNECTIONS
            )

        return img

    # ─── LANDMARKS ────────────────────────────────────────────────────────────
    def findPosition(self, img, draw=False):
        self.lmList = []
        self.lm_map = {}
        self.visibility = {}
        self.norm_map = {}
        self.lm3d = {}

        if not self.poseDetected():
            self.prev.clear()
            return self.lmList

        h, w, _ = img.shape

        for idx, lm in enumerate(self.results.pose_landmarks.landmark):
            cx, cy = int(lm.x * w), int(lm.y * h)

            # EMA smoothing per landmark
            if idx in self.prev:
                px, py = self.prev[idx]
                cx = int(self.alpha * cx + (1 - self.alpha) * px)
                cy = int(self.alpha * cy + (1 - self.alpha) * py)

            self.prev[idx] = (cx, cy)

            self.lmList.append([idx, cx, cy])
            self.lm_map[idx] = (cx, cy)
            self.visibility[idx] = lm.visibility
            self.norm_map[idx] = (lm.x, lm.y)
            self.lm3d[idx] = (lm.x, lm.y, lm.z)

            if draw:
                cv2.circle(img, (cx, cy), 4, (255, 0, 0), cv2.FILLED)

        return self.lmList

    # ─── ANGLE ────────────────────────────────────────────────────────────────
    def findAngle(self, img, p1, p2, p3, draw=False):
        if p1 not in self.lm_map or p2 not in self.lm_map or p3 not in self.lm_map:
            return None

        x1, y1 = self.lm_map[p1]
        x2, y2 = self.lm_map[p2]
        x3, y3 = self.lm_map[p3]

        a = np.array([x1 - x2, y1 - y2], dtype=np.float32)
        b = np.array([x3 - x2, y3 - y2], dtype=np.float32)

        cos_val = np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b) + 1e-6)
        angle = np.degrees(np.arccos(np.clip(cos_val, -1.0, 1.0)))

        if draw:
            cv2.line(img, (x1, y1), (x2, y2), (255, 255, 255), 2)
            cv2.line(img, (x3, y3), (x2, y2), (255, 255, 255), 2)
            for pt in [(x1, y1), (x2, y2), (x3, y3)]:
                cv2.circle(img, pt, 6, (0, 0, 255), cv2.FILLED)
            cv2.putText(
                img, str(int(angle)),
                (x2 + 10, y2 - 10),
                cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2
            )

        return angle

    # ─── DISTANCE ─────────────────────────────────────────────────────────────
    def findDistance(self, p1, p2):
        if p1 not in self.lm_map or p2 not in self.lm_map:
            return None
        x1, y1 = self.lm_map[p1]
        x2, y2 = self.lm_map[p2]
        return float(np.hypot(x2 - x1, y2 - y1))

    # ─── BODY CENTER ──────────────────────────────────────────────────────────
    def getBodyCenter(self):
        ids = [11, 12, 23, 24]
        pts = [self.lm_map[i] for i in ids if i in self.lm_map]
        if not pts:
            return None
        x = int(sum(p[0] for p in pts) / len(pts))
        y = int(sum(p[1] for p in pts) / len(pts))
        return (x, y)

    # ─── BEST SIDE ────────────────────────────────────────────────────────────
    def getBestSide(self):
        """Return the side (left/right) whose shoulder→elbow→wrist chain
        has higher average visibility. Use this to pick which arm to track."""
        left  = self.getVisibility(11) + self.getVisibility(13) + self.getVisibility(15)
        right = self.getVisibility(12) + self.getVisibility(14) + self.getVisibility(16)
        return "left" if left > right else "right"

    # ─── VISIBILITY ───────────────────────────────────────────────────────────
    def getVisibility(self, idx):
        return self.visibility.get(idx, 0.0)

    def areVisible(self, ids, threshold=0.3):
        return all(self.visibility.get(i, 0) >= threshold for i in ids)

    # ─── POINT ACCESS ─────────────────────────────────────────────────────────
    def getPoint(self, idx):
        return self.lm_map.get(idx, None)

    # ─── POSE CHECK ───────────────────────────────────────────────────────────
    def poseDetected(self):
        return (
            self.results is not None and
            self.results.pose_landmarks is not None
        )