import 'package:flutter/material';
import 'package:google_fonts/google_fonts';
import '../theme/app_theme.dart';

class Volume5ArchitectureView extends StatelessWidget {
  const Volume5ArchitectureView({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAlignment.start,
        children: [
          Text("Volume 5: Master Architecture & Scorecard", style: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
          const SizedBox(height: 16),

          // Scorecard Card
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppTheme.bgCard,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0x1AFFFFFF)),
            ),
            child: Column(
              crossAxisAlignment: CrossAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text("B.Tech CSE Project Scorecard", style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold)),
                    const Text("9.5 / 10", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF34D399))),
                  ],
                ),
                const SizedBox(height: 12),
                _scoreRow("Software & Web Engineering", "10 / 10"),
                _scoreRow("AI & Vision Models", "9.5 / 10"),
                _scoreRow("IoT Collar Hardware", "8.5 / 10"),
                _scoreRow("GIS Location & Geofencing", "9.0 / 10"),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Database Schemas Preview
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: const Color(0xFF04060C),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: Colors.white12),
            ),
            child: const Column(
              crossAxisAlignment: CrossAlignment.start,
              children: [
                Text("PostgreSQL 'pets' Table Definition", style: TextStyle(color: Color(0xFFA5B4FC), fontSize: 13, fontWeight: FontWeight.bold, fontFamily: 'monospace')),
                SizedBox(height: 8),
                Text(
                  "CREATE TABLE pets (\n  pet_id UUID PRIMARY KEY,\n  owner_id UUID REFERENCES users,\n  name VARCHAR(100),\n  breed VARCHAR(100),\n  collar_hardware_id VARCHAR(50)\n);",
                  style: TextStyle(color: Color(0xFF38BDF8), fontSize: 12, fontFamily: 'monospace'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _scoreRow(String title, String score) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(title, style: const TextStyle(fontSize: 12, color: Color(0xFF94A3B8))),
          Text(score, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
        ],
      ),
    );
  }
}
