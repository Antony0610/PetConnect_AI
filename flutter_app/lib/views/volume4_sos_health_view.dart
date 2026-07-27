import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../models/pet_model.dart';
import '../theme/app_theme.dart';

class Volume4SOSHealthView extends StatelessWidget {
  final PetModel pet;
  final VoidCallback onTriggerSOS;

  const Volume4SOSHealthView({super.key, required this.pet, required this.onTriggerSOS});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text("Volume 4: SOS & QR Health Passport", style: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
          const SizedBox(height: 16),

          // Digital QR Passport Card
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AppTheme.bgCard,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppTheme.primary.withOpacity(0.3)),
            ),
            child: Column(
              children: [
                Container(
                  width: 110,
                  height: 110,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Center(
                    child: Icon(Icons.qr_code_2, size: 90, color: Colors.black),
                  ),
                ),
                const SizedBox(height: 12),
                Text(pet.name, style: GoogleFonts.outfit(fontSize: 20, fontWeight: FontWeight.bold)),
                Text("${pet.breed} • QR ID: PETCONNECT-992014", style: const TextStyle(fontSize: 12, color: Color(0xFF38BDF8))),
                const SizedBox(height: 12),
                const Text("Vaccinations: Rabies Valid (Jan 2026), DHPP Core Valid", style: TextStyle(fontSize: 11, color: Colors.white70)),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // Emergency SOS Trigger Button
          SizedBox(
            width: double.infinity,
            height: 50,
            child: ElevatedButton.icon(
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.danger,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
              ),
              onPressed: onTriggerSOS,
              icon: const Icon(Icons.warning_amber_rounded, color: Colors.white),
              label: const Text("TRIGGER EMERGENCY SOS BROADCAST", style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
            ),
          ),
        ],
      ),
    );
  }
}
