from fastapi import FastAPI, Depends, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
import json
import asyncio
import math
import sys
import os

# Robust relative/absolute imports for Vercel Serverless runtime & local execution
try:
    from backend.database import engine, get_db, Base
    from backend.models import Pet, User, GpsTelemetry, Alert, StrayReport
except ImportError:
    from database import engine, get_db, Base
    from models import Pet, User, GpsTelemetry, Alert, StrayReport

# Import 6 AI Modules A-F
try:
    from ai_engine.ai_pet_identity import AIPetIdentityEngine
    from ai_engine.siamese_pet_matcher import SiamesePetMatcher
    from ai_engine.rag_llm_assistant import RAGPetAssistant
    from ai_engine.activity_classifier import ActivityClassifier
    from ai_engine.adoption_recommender import AIAdoptionRecommender
    from ai_engine.rescue_priority_engine import RescuePriorityEngine
except ImportError:
    sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
    from ai_engine.ai_pet_identity import AIPetIdentityEngine
    from ai_engine.siamese_pet_matcher import SiamesePetMatcher
    from ai_engine.rag_llm_assistant import RAGPetAssistant
    from ai_engine.activity_classifier import ActivityClassifier
    from ai_engine.adoption_recommender import AIAdoptionRecommender
    from ai_engine.rescue_priority_engine import RescuePriorityEngine

# Initialize Database Tables if engine present
if engine:
    try:
        Base.metadata.create_all(bind=engine)
    except Exception as e:
        print(f"DB Init note: {e}")

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

# Instantiate 6 AI Engines
identity_engine = AIPetIdentityEngine()
matcher_engine = SiamesePetMatcher()
rag_assistant = RAGPetAssistant()
activity_classifier = ActivityClassifier()
adoption_recommender = AIAdoptionRecommender()
rescue_priority_engine = RescuePriorityEngine()

@app.get("/")
def read_root():
    return {
        "status": "online",
        "system": "PetConnect AI 5-Volume Ecosystem Backend",
        "modules": ["Module A: Identity", "Module B: Lost Matcher", "Module C: RAG Assistant", "Module D: Activity ML", "Module E: Adoption ML", "Module F: Rescue Priority"]
    }

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "backend"}

# Module A Endpoint
class BiometricUpload(BaseModel):
    face_image_b64: Optional[str] = None
    nose_print_b64: Optional[str] = None
    coat_pattern_b64: Optional[str] = None
    body_shape_b64: Optional[str] = None

@app.post("/api/v1/ai/biometric-identity")
def generate_biometric_identity(data: BiometricUpload):
    res = identity_engine.register_pet_biometrics(
        face_img=data.face_image_b64,
        nose_img=data.nose_print_b64,
        coat_img=data.coat_pattern_b64,
        body_img=data.body_shape_b64
    )
    return res

# Module B Endpoint
class MatchQuery(BaseModel):
    missing_pet_id: str
    sighting_image_b64: str

@app.post("/api/v1/ai/lost-pet-match")
def match_lost_pet(data: MatchQuery):
    results = matcher_engine.match_sighting_to_lost_database(data.sighting_image_b64)
    return {"matches": results}

# Module C Endpoint
class AssistantQuery(BaseModel):
    user_id: str
    pet_id: str
    prompt: str

@app.post("/api/v1/ai/chat")
def chat_with_assistant(query: AssistantQuery):
    resp = rag_assistant.query_assistant(query.user_id, query.pet_id, query.prompt)
    return {"response": resp}

# Module D Endpoint
class ActivityData(BaseModel):
    accel_x: float
    accel_y: float
    accel_z: float

@app.post("/api/v1/ai/activity-classify")
def classify_activity(data: ActivityData):
    res = activity_classifier.predict_behavior(data.accel_x, data.accel_y, data.accel_z)
    return res

# Module E Endpoint
class AdoptionPreferences(BaseModel):
    house_size: str
    work_hours: str
    has_children: bool
    pet_experience: str
    budget_range: str

@app.post("/api/v1/ai/adoption-score")
def score_adoption_matches(prefs: AdoptionPreferences):
    res = adoption_recommender.recommend_breeds(prefs.dict())
    return {"recommendations": res}

# Module F Endpoint
class StrayReportData(BaseModel):
    location: str
    condition_description: str
    is_injured: bool

@app.post("/api/v1/ai/rescue-priority")
def calculate_rescue_priority(report: StrayReportData):
    res = rescue_priority_engine.calculate_priority(report.condition_description, report.is_injured)
    return res
