"""
PetConnect AI — ESP32 Smart Pet Collar Hardware Telemetry Emulator
Streams synthetic GPS coordinates, battery levels, and MPU6050 motion vectors to the API server.
"""

import time
import math
import random
import json

def generate_telemetry_packet(pet_id="ESP32-COLLAR-88"):
    # Base location (Metro Sector 4)
    base_lat = 10.02345
    base_lng = 76.34567
    
    # Slight movement simulation
    jitter_lat = (random.random() - 0.5) * 0.0003
    jitter_lng = (random.random() - 0.5) * 0.0003
    
    # MPU6050 Accelerometer
    accel_x = round(0.12 + (random.random() - 0.5) * 0.08, 2)
    accel_y = round(-0.05 + (random.random() - 0.5) * 0.08, 2)
    accel_z = round(0.98 + (random.random() - 0.5) * 0.04, 2)
    
    packet = {
        "device_id": pet_id,
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "gps": {
            "latitude": round(base_lat + jitter_lat, 5),
            "longitude": round(base_lng + jitter_lng, 5),
            "satellites": 9,
            "speed_kmh": round(random.uniform(1.2, 4.5), 1)
        },
        "mpu6050": {
            "accel_x_g": accel_x,
            "accel_y_g": accel_y,
            "accel_z_g": accel_z,
            "classified_activity": "walking" if accel_x > 0.1 else "resting"
        },
        "battery_pct": 88
    }
    return packet

if __name__ == "__main__":
    print("=== PETCONNECT AI — ESP32 SMART COLLAR HARDWARE EMULATOR ===")
    print("Streaming live telemetry packets every 5 seconds (Press Ctrl+C to stop)...\n")
    try:
        while True:
            pkt = generate_telemetry_packet()
            print(f"[{pkt['timestamp']}] GPS: ({pkt['gps']['latitude']}, {pkt['gps']['longitude']}) | Activity: {pkt['mpu6050']['classified_activity']} | Batt: {pkt['battery_pct']}%")
            time.sleep(5)
    except KeyboardInterrupt:
        print("\nEmulator stopped.")
