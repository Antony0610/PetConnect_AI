from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    role = Column(String, default="owner") # owner, vet, volunteer, admin
    is_approved = Column(Boolean, default=True) # Approval required for vets/volunteers
    phone = Column(String)

class Pet(Base):
    __tablename__ = "pets"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    breed = Column(String)
    age = Column(Float)
    weight = Column(Float)
    microchip_id = Column(String, unique=True, index=True)
    collar_hardware_id = Column(String, unique=True, index=True)
    qr_passport_id = Column(String, unique=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))

class Prescription(Base):
    __tablename__ = "prescriptions"
    id = Column(Integer, primary_key=True, index=True)
    pet_id = Column(Integer, ForeignKey("pets.id"))
    vet_name = Column(String)
    medication = Column(String)
    dosage = Column(String)
    instructions = Column(Text)
    date = Column(DateTime, default=datetime.utcnow)

class VaccinationRecord(Base):
    __tablename__ = "vaccination_records"
    id = Column(Integer, primary_key=True, index=True)
    pet_id = Column(Integer, ForeignKey("pets.id"))
    vaccine_name = Column(String)
    administered_date = Column(DateTime, default=datetime.utcnow)
    expiry_date = Column(DateTime)
    vet_signature = Column(String)

class RescueMission(Base):
    __tablename__ = "rescue_missions"
    id = Column(Integer, primary_key=True, index=True)
    report_title = Column(String)
    location = Column(String)
    assigned_volunteer_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    status = Column(String, default="Pending") # Pending, In Progress, Rescued, Fostered
    image_url = Column(String, nullable=True)
    foster_details = Column(String, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)

class BroadcastNotification(Base):
    __tablename__ = "broadcast_notifications"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    message = Column(Text)
    target_role = Column(String, default="all")
    created_at = Column(DateTime, default=datetime.utcnow)
