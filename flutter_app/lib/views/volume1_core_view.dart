import 'package:flutter/material';
import 'package:google_fonts/google_fonts';
import '../models/pet_model.dart';
import '../theme/app_theme.dart';

class Volume1CoreView extends StatelessWidget {
  final PetModel pet;

  const Volume1CoreView({super.key, required this.pet});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAlignment.start,
        children: [
          // Banner Card
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF0F172A), Color(0xFF1E293B)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppTheme.primary.withOpacity(0.3)),
            ),
            child: Column(
              crossAxisAlignment: CrossAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: AppTheme.primary.withOpacity(0.15),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: AppTheme.primary.withOpacity(0.3)),
                  ),
                  child: Text(
                    "VOLUME 1 SPECIFICATION",
                    style: GoogleFonts.outfit(
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                      color: const Color(0xFF818CF8),
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                Text(
                  "Core Ecosystem & GIS Infrastructure",
                  style: GoogleFonts.outfit(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  "Centralized management hub for pet digital profiles, GIS veterinary services, and pet-friendly travel logistics.",
                  style: TextStyle(fontSize: 13, color: AppTheme.textMuted),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // Pet Digital Profile Card
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AppTheme.bgCard,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: const Color(0x1AFFFFFF)),
            ),
            child: Column(
              crossAxisAlignment: CrossAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      "Pet Digital Profile",
                      style: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: AppTheme.success.withOpacity(0.15),
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: AppTheme.success.withOpacity(0.3)),
                      ),
                      child: const Text("Verified Chip", style: TextStyle(fontSize: 11, color: Color(0xFF34D399), fontWeight: FontWeight.bold)),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    CircleAvatar(
                      radius: 30,
                      backgroundColor: AppTheme.primary,
                      child: const Icon(Icons.pets, size: 32, color: Colors.white),
                    ),
                    const SizedBox(width: 16),
                    Column(
                      crossAxisAlignment: CrossAlignment.start,
                      children: [
                        Text(pet.name, style: GoogleFonts.outfit(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)),
                        Text("${pet.breed} • ${pet.age} Yrs", style: TextStyle(fontSize: 13, color: AppTheme.textMuted)),
                        Text("CHIP ID: ${pet.microchip}", style: const TextStyle(fontSize: 11, color: Color(0xFF64748B), fontFamily: 'monospace')),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 16),

                // Grid Details
                GridView.count(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  crossAxisCount: 2,
                  childAspectRatio: 2.2,
                  crossAxisSpacing: 10,
                  mainAxisSpacing: 10,
                  children: [
                    _infoTile("Weight", "${pet.weight} kg"),
                    _infoTile("Collar Device", pet.collarId),
                    _infoTile("Primary Vet", pet.primaryVet),
                    _infoTile("Rabies Shot", "Valid (Jan 2026)"),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // GIS Services List
          Text("Nearby GIS Services (Metro Sector 4)", style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
          const SizedBox(height: 10),
          _serviceTile("Metro Veterinary Hospital & ER", "0.8 km away • Open 24/7", "4.9 ★", Icons.local_hospital, AppTheme.danger),
          _serviceTile("Happy Tails Grooming Spa", "1.2 km away • Open Now", "4.8 ★", Icons.content_cut, AppTheme.accentCyan),
          _serviceTile("Central Animal Rescue Shelter", "3.5 km away • Volunteers Welcome", "4.9 ★", Icons.volunteer_activism, AppTheme.success),
        ],
      ),
    );
  }

  Widget _infoTile(String label, String value) {
    return Container(
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: const Color(0x0AFFFFFF),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0x1AFFFFFF)),
      ),
      child: Column(
        crossAxisAlignment: CrossAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(label, style: const TextStyle(fontSize: 10, color: Color(0xFF64748B))),
          const SizedBox(height: 2),
          Text(value, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white)),
        ],
      ),
    );
  }

  Widget _serviceTile(String name, String desc, String rating, IconData icon, Color color) {
    return Card(
      margin: const EdgeInsets.only(bottom: 10),
      child: ListTile(
        leading: CircleAvatar(backgroundColor: color.withOpacity(0.2), child: Icon(icon, color: color, size: 20)),
        title: Text(name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
        subtitle: Text(desc, style: TextStyle(fontSize: 12, color: AppTheme.textMuted)),
        trailing: Text(rating, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.amber)),
      ),
    );
  }
}
