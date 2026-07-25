"""
PetConnect AI — Role-Based Access Control (RBAC) Permission Matrix
Defines explicit permission rules for Pet Owner, Veterinarian, Rescue Volunteer, and Administrator.
"""

ROLE_PERMISSIONS = {
    "owner": [
        "register_pet",
        "track_pet",
        "chat_ai",
        "report_lost_pet",
        "book_vet",
        "receive_notifications",
        "view_health_passport",
        "manage_collar"
    ],
    "vet": [
        "access_medical_history",
        "update_vaccination",
        "add_prescription",
        "upload_reports",
        "respond_emergency",
        "approve_medical_requests"
    ],
    "volunteer": [
        "view_rescue_requests",
        "accept_rescue_mission",
        "upload_rescue_images",
        "update_rescue_status",
        "report_injured_animal",
        "coordinate_foster_care"
    ],
    "admin": [
        "manage_users",
        "manage_vets",
        "approve_volunteers",
        "view_reports",
        "manage_adoption",
        "manage_ai_logs",
        "broadcast_notifications",
        "view_analytics"
    ]
}

def has_permission(user_role: str, permission: str) -> bool:
    role_perms = ROLE_PERMISSIONS.get(user_role.lower(), [])
    return permission in role_perms
