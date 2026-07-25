from backend.database import engine, SessionLocal, Base
from backend.models import User, Pet, StrayReport

def init_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # Check if seed data exists
    if not db.query(User).filter(User.email == "antony@petconnect.ai").first():
        user = User(email="antony@petconnect.ai", name="Antony", role="owner", phone="+15550192900")
        db.add(user)
        db.commit()
        db.refresh(user)

        pet = Pet(
            name="Bruno",
            breed="Golden Retriever",
            age=3.5,
            weight=28.4,
            microchip_id="981020004812901",
            collar_hardware_id="ESP32-COLLAR-88",
            qr_passport_id="PETCONNECT-992014",
            owner_id=user.id
        )
        db.add(pet)

        stray = StrayReport(issue_type="Injured Stray Dog", location="Sector 4 Metro Pillar 42", status="Volunteer Assigned", reporter_name="Alex M.")
        db.add(stray)
        db.commit()
        print("[OK] Database seeded successfully!")

    db.close()

if __name__ == "__main__":
    init_db()
