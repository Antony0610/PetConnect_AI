/*
 * PetConnect AI — Smart Pet Collar IoT Firmware (Volume 3)
 * Target Microcontroller: ESP32 NodeMCU
 * Modules: NEO-6M GPS, MPU6050 Accelerometer/Gyroscope, TP4056 Battery Charger, Buzzer, LED
 * Communication: HTTP / MQTT Telemetry Stream to Django/FastAPI/Node Backend
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <TinyGPS++.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Wire.h>

// WiFi Configuration
const char* WIFI_SSID = "PetConnect_IoT_Network";
const char* WIFI_PASS = "smartcollar2026";

// Server Telemetry Endpoint
const char* TELEMETRY_URL = "https://api.petconnect.ai/v1/telemetry/stream";

// Pin Definitions
#define BUZZER_PIN 23
#define LED_PIN    19
#define GPS_RX_PIN 16
#define GPS_TX_PIN 17

// Global Sensor Instances
TinyGPSPlus gps;
HardwareSerial neogps(1);
Adafruit_MPU6050 mpu;

// Device Identity
const char* DEVICE_ID = "ESP32-COLLAR-88";

void setup() {
  Serial.begin(115200);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);
  digitalWrite(LED_PIN, LOW);

  // Initialize I2C for MPU6050
  Wire.begin();
  if (!mpu.begin()) {
    Serial.println("[ERROR] MPU6050 Accelerometer not found!");
  } else {
    Serial.println("[OK] MPU6050 initialized.");
    mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
    mpu.setGyroRange(MPU6050_RANGE_500_DEG);
  }

  // Initialize Serial1 for GPS Module
  neogps.begin(9600, SERIAL_8N1, GPS_RX_PIN, GPS_TX_PIN);

  // Connect to WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.print("[WiFi] Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n[WiFi] Connected successfully!");
}

void loop() {
  // Feed GPS parser
  while (neogps.available() > 0) {
    gps.encode(neogps.read());
  }

  // Read MPU6050 Accelerometer Data
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

  // Calculate acceleration magnitude for Impact / Fall Detection
  float accelMagnitude = sqrt(pow(a.acceleration.x, 2) + pow(a.acceleration.y, 2) + pow(a.acceleration.z, 2));

  // Sudden Impact Detection (> 4.5g spike)
  if (accelMagnitude > 44.0) { // ~4.5g in m/s^2
    Serial.println("[ALERT] Sudden Impact Spike Detected!");
    triggerSoundAlert(3);
  }

  // Every 30 seconds: Stream Telemetry to Server
  static unsigned long lastStreamTime = 0;
  if (millis() - lastStreamTime > 30000) {
    lastStreamTime = millis();
    sendTelemetry(gps.location.lat(), gps.location.lng(), a.acceleration.x, a.acceleration.y, a.acceleration.z);
  }
}

void sendTelemetry(double lat, double lng, float ax, float ay, float az) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(TELEMETRY_URL);
    http.addHeader("Content-Type", "application/json");

    String jsonPayload = "{";
    jsonPayload += "\"device_id\":\"" + String(DEVICE_ID) + "\",";
    jsonPayload += "\"lat\":" + String(lat, 5) + ",";
    jsonPayload += "\"lng\":" + String(lng, 5) + ",";
    jsonPayload += "\"accel_x\":" + String(ax, 2) + ",";
    jsonPayload += "\"accel_y\":" + String(ay, 2) + ",";
    jsonPayload += "\"accel_z\":" + String(az, 2);
    jsonPayload += "}";

    int httpResponseCode = http.POST(jsonPayload);
    Serial.printf("[HTTP] Telemetry POST status: %d\n", httpResponseCode);
    http.end();
  }
}

void triggerSoundAlert(int count) {
  for (int i = 0; i < count; i++) {
    digitalWrite(BUZZER_PIN, HIGH);
    digitalWrite(LED_PIN, HIGH);
    delay(200);
    digitalWrite(BUZZER_PIN, LOW);
    digitalWrite(LED_PIN, LOW);
    delay(200);
  }
}
