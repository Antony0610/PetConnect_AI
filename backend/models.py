from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    role = Column(String, default="owner") # owner, vet, volunteer, shelter
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

class GpsTelemetry(Base):
    __tablename__ = "gps_telemetry"
    id = Column(Integer, primary_key=True, index=True)
    collar_id = Column(String, index=True)
    latitude = Column(Float)
    longitude = Column(Float)
    accel_x = Column(Float)
    accel_y = Column(Float)
    accel_z = Column(Float)
    battery_pct = Column(Integer)
    classified_activity = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    pet_id = Column(Integer, ForeignKey("pets.id"))
    alert_type = Column(String) # GEOFENCE_BREACH, IMPACT_SPIKE, SOS
    message = Column(Text)
    is_resolved = Column(Boolean, default=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

class StrayReport(Base):
    __tablename__ = "stray_reports"
    id = Column(Integer, primary_key=True, index=True)
    issue_type = Column(String)
    location = Column(String)
    status = Column(String, default="Open")
    reporter_name = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
