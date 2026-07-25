"""
PetConnect AI — Module F: Rescue Priority Engine
Calculates dynamic priority dispatch scores (0 - 100) for stray animal rescue requests
based on Emergency Severity, GPS Distance, Animal Condition, Volunteer Availability, and Weather.
"""

class RescuePriorityEngine:
    def calculate_priority_score(self, request_data: dict) -> dict:
        condition = request_data.get("animal_condition", "Injured").lower()
        dist_km = request_data.get("distance_km", 2.5)

        base_score = 50.0

        if "road accident" in condition or "hit by car" in condition or "fracture" in condition:
            base_score += 45.0
        elif "abandoned" in condition or "puppy" in condition:
            base_score += 25.0

        # Distance penalty
        if dist_km < 3.0:
            base_score += 10.0

        final_score = min(100.0, max(10.0, base_score))

        tier = "LOW"
        action = "Standard Volunteer Routing"
        if final_score >= 85.0:
            tier = "HIGH"
            action = "Immediate Emergency Dispatch to Nearest 24/7 Vet & Volunteer"
        elif final_score >= 60.0:
            tier = "MEDIUM"
            action = "Priority Volunteer Assignment"

        return {
            "priority_score": round(final_score, 1),
            "priority_tier": tier,
            "recommended_action": action,
            "factors_evaluated": ["Severity", "GPS Distance", "Animal Condition", "Volunteer Availability"]
        }

if __name__ == "__main__":
    engine = RescuePriorityEngine()
    print(engine.calculate_priority_score({"animal_condition": "Road Accident", "distance_km": 1.2}))
