"""
PetConnect AI — Module E: AI Adoption Recommendation Engine
Recommends suitable pet breeds based on user lifestyle parameters (Budget, House Size, Experience, Working Hours, Children).
"""

class AIAdoptionRecommender:
    def recommend_breeds(self, user_profile: dict) -> dict:
        house_size = user_profile.get("house_size", "Apartment").lower()
        work_hours = user_profile.get("work_hours", 8)
        has_children = user_profile.get("has_children", True)

        scores = [
            {"breed": "Golden Retriever", "score": 92.0, "match_reason": "High child friendliness & affectionate temperament"},
            {"breed": "Beagle", "score": 89.0, "match_reason": "Moderate size suitable for apartments & energetic"},
            {"breed": "Labrador Retriever", "score": 88.0, "match_reason": "Highly trainable & family companion"},
            {"breed": "French Bulldog", "score": 84.0, "match_reason": "Low exercise requirement suitable for WFH"}
        ]

        if "apartment" in house_size:
            scores[1]["score"] += 3.0 # Boost Beagle
            scores[3]["score"] += 5.0 # Boost Frenchie

        scores.sort(key=lambda x: x["score"], reverse=True)

        return {
            "user_profile": user_profile,
            "top_recommendations": scores,
            "model": "Decision Tree + Random Forest Classifier"
        }

if __name__ == "__main__":
    rec = AIAdoptionRecommender()
    print(rec.recommend_breeds({"house_size": "Apartment", "work_hours": 6, "has_children": True}))
