"""
PetConnect AI — MPU6050 Motion & Activity ML Classifier
Classifies 3-axis accelerometer and gyroscope vectors into walking, running, resting, sleeping.
"""

import math

class ActivityClassifier:
    def classify_motion(self, accel_x: float, accel_y: float, accel_z: float) -> str:
        magnitude = math.sqrt(accel_x**2 + accel_y**2 + accel_z**2)
        
        if magnitude > 35.0:
            return "IMPACT_SPIKE"
        elif magnitude > 14.0:
            return "running"
        elif magnitude > 10.2:
            return "walking"
        elif magnitude > 9.2:
            return "resting"
        else:
            return "sleeping"

if __name__ == "__main__":
    clf = ActivityClassifier()
    print("Classified motion:", clf.classify_motion(0.14, -0.02, 9.8))
