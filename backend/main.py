from fastapi import FastAPI, Depends, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
import json
import asyncio
import math

from backend.database import engine, get_db, Base
from backend.models import Pet, User, GpsTelemetry, Alert, StrayReport

# Import 6 AI Modules A-F
from ai_engine.ai_pet_identity import AIPetIdentityEngine
from ai_engine.siamese_pet_matcher import SiamesePetMatcher
from ai_engine.rag_llm_assistant import RAGPetAssistant
from ai_engine.activity_classifier import ActivityClassifier
from ai_engine.adoption_recommender import AIAdoptionRecommender
from ai_engine.rescue_priority_engine import RescuePriorityEngine

# Initialize Database Tables
if engine:
    Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="PetConnect AI Backend REST & WebSocket API",
    description="6 AI Modules A-F & ESP32 Telemetry Engine for PetConnect AI",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Instantiate AI Engines A-F
biometric_identity_engine = AIPetIdentityEngine()
lost_pet_matcher = SiamesePetMatcher()
rag_assistant = RAGPetAssistant()
activity_intelligence = ActivityClassifier()
adoption_recommender = AIAdoptionRecommender()
rescue_priority_engine = RescuePriorityEngine()

# Pydantic Query Models
class BiometricRegQuery(BaseModel):
    pet_name: str
    front_face: Optional[str] = "bruno_face.jpg"
    left_face: Optional[str] = "bruno_left.jpg"
    right_face: Optional[str] = "bruno_right.jpg"
    nose_print: Optional[str] = "bruno_nose.jpg"
    full_body: Optional[str] = "bruno_body.jpg"

class RAGQuery(BaseModel):
    user_query: str
    pet_id: Optional[str] = "bruno"

class AdoptionQuery(BaseModel):
    house_size: Optional[str] = "Apartment"
    work_hours: Optional[int] = 8
    has_children: Optional[bool] = True

class RescuePriorityQuery(BaseModel):
    animal_condition: str
    distance_km: Optional[float] = 1.5

@app.get("/")
def root():
    return {
        "status": "online",
        "system": "PetConnect AI 6-Module AI Subsystem",
        "modules_active": ["Module A Identity", "Module B Lost Pet", "Module C RAG Assistant", "Module D Activity", "Module E Adoption", "Module F Rescue Priority"]
    }

# MODULE A: AI Pet Identity (Multi-Biometric Fusion)
@app.post("/api/v1/ai/module-a/biometric-identity")
def create_biometric_identity(data: BiometricRegQuery):
    profile = biometric_identity_engine.generate_fused_identity_profile(data.model_dump())
    return profile

# MODULE B: Lost Pet AI Search
@app.post("/api/v1/ai/module-b/lost-pet-search")
def search_lost_pet(found_image_url: str = "finder_photo.jpg"):
    sample_db = [
        {"id": 1, "name": "Bruno", "photo_url": "collar_hero.jpg"},
        {"id": 2, "name": "Max", "photo_url": "ai_matcher.jpg"}
    ]
    matches = lost_pet_matcher.match_found_pet(found_image_url, sample_db)
    return {"status": "success", "ranked_matches": matches}

# MODULE C: PetConnect AI Assistant (RAG Gemma 3 / Phi-3 Mini)
@app.post("/api/v1/ai/module-c/rag-assistant")
def query_rag_assistant(data: RAGQuery):
    response = rag_assistant.generate_response(data.user_query, data.pet_id)
    return response

# MODULE D: Activity Intelligence
@app.post("/api/v1/ai/module-d/activity-intelligence")
def classify_activity(accel_x: float, accel_y: float, accel_z: float):
    activity = activity_intelligence.classify_motion(accel_x, accel_y, accel_z)
    return {"classified_activity": activity}

# MODULE E: AI Adoption Recommendation
@app.post("/api/v1/ai/module-e/adoption-recommendation")
def recommend_adoption(data: AdoptionQuery):
    recommendations = adoption_recommender.recommend_breeds(data.model_dump())
    return recommendations

# MODULE F: Rescue Priority Engine
@app.post("/api/v1/ai/module-f/rescue-priority")
def calculate_rescue_priority(data: RescuePriorityQuery):
    priority = rescue_priority_engine.calculate_priority_score(data.model_dump())
    return priority
