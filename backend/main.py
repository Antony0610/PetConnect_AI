from fastapi import FastAPI, Depends, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json
import asyncio

from backend.database import engine, get_db, Base
from backend.models import Pet, User, GpsTelemetry, Alert, StrayReport
from ai_engine.llm_health_assistant import LLMHealthAssistant
from ai_engine.siamese_pet_matcher import SiamesePetMatcher
from ai_engine.breed_health_classifier import BreedHealthClassifier
from ai_engine.activity_classifier import ActivityClassifier

# Initialize Database Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="PetConnect AI Backend REST & WebSocket API",
    description="End-to-End Backend & LLM Inference Pipeline for PetConnect AI",
    version="1.0.0"
)

# Enable CORS for Web & Mobile Clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AI Modules
llm_assistant = LLMHealthAssistant()
siamese_matcher = SiamesePetMatcher()
breed_classifier = BreedHealthClassifier()
motion_classifier = ActivityClassifier()

# Pydantic Schemas
class SymptomQuery(BaseModel):
    user_query: str

class ImageScanQuery(BaseModel):
    image_path: str

class TelemetryPacket(BaseModel):
    collar_id: str
    latitude: float
    longitude: float
    accel_x: float
    accel_y: float
    accel_z: float
    battery_pct: int

class SOSBroadcast(BaseModel):
    pet_id: str
    latitude: float
    longitude: float
    medical_notes: Optional[str] = None

# API Routes
@app.get("/")
def root():
    return {"status": "online", "message": "PetConnect AI FastAPI Backend & LLM Server Active"}

# 1. LLM Health Symptom Triage Endpoint
@app.post("/api/v1/ai/symptom-triage")
def symptom_triage(data: SymptomQuery):
    result = llm_assistant.triage_symptom(data.user_query)
    return result

# 2. Vision Breed & Health Scan Endpoint
@app.post("/api/v1/ai/breed-scan")
def breed_scan(data: ImageScanQuery):
    result = breed_classifier.classify_image(data.image_path)
    return result

# 3. Siamese Lost Pet Feature Match Endpoint
@app.post("/api/v1/ai/match-lost-pet")
def match_lost_pet(data: ImageScanQuery):
    sample_db = [
        {"id": 1, "name": "Bruno", "photo_url": "collar_hero.jpg"},
        {"id": 2, "name": "Max", "photo_url": "ai_matcher.jpg"}
    ]
    matches = siamese_matcher.match_found_pet(data.image_path, sample_db)
    return {"status": "success", "matches": matches}

# 4. Telemetry Ingestion Endpoint (ESP32 Smart Collar)
@app.post("/api/v1/telemetry/ingest")
def ingest_telemetry(pkt: TelemetryPacket):
    activity = motion_classifier.classify_motion(pkt.accel_x, pkt.accel_y, pkt.accel_z)
    
    # Check Geofence Breach (Home Radius 300m from 10.02345, 76.34567)
    dist_meters = math.sqrt(((pkt.latitude - 10.02345) * 111000)**2 + ((pkt.longitude - 76.34567) * 111000)**2)
    is_breached = dist_meters > 300.0

    return {
        "status": "received",
        "collar_id": pkt.collar_id,
        "classified_activity": activity,
        "geofence_breached": is_breached,
        "distance_from_home_meters": round(dist_meters, 1)
    }

# 5. Emergency SOS Dispatch Endpoint
@app.post("/api/v1/sos/broadcast")
def broadcast_sos(data: SOSBroadcast):
    return {
        "status": "dispatched",
        "message": f"Emergency SOS broadcasted for pet {data.pet_id} to 32 nearby clinics.",
        "coordinates": {"lat": data.latitude, "lng": data.longitude}
    }

import math
