import 'package:flutter/material';
import 'package:google_fonts/google_fonts';
import '../theme/app_theme.dart';

class Volume3CollarView extends StatefulWidget {
  const Volume3CollarView({super.key});

  @override
  State<Volume3CollarView> createState() => _Volume3CollarViewState();
}

class _Volume3CollarViewState extends State<Volume3CollarView> {
  double _geofenceRadius = 300.0;
  bool _isBuzzerActive = false;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAlignment.start,
        children: [
          // Banner
          Text("Volume 3: Smart Pet Collar (ESP32 IoT Module)", style: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
          const SizedBox(height: 12),

          // Live Telemetry Card
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
                    const Text("ESP32 Telemetry (30s Stream)", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                      decoration: BoxDecoration(color: AppTheme.success.withOpacity(0.2), borderRadius: BorderRadius.circular(8)),
                      child: const Text("ONLINE • 88% BATT", style: TextStyle(fontSize: 10, color: Color(0xFF34D399), fontWeight: FontWeight.bold)),
                    ),
                  ],
                ),
                const SizedBox(height: 16),

                // Simulated Map Container
                Container(
                  height: 160,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: const Color(0xFF040914),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: Colors.white12),
                  ),
                  child: Stack(
                    alignment: Alignment.center,
                    children: [
                      // Geofence Circle
                      Container(
                        width: (_geofenceRadius / 300) * 110,
                        height: (_geofenceRadius / 300) * 110,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: AppTheme.primary.withOpacity(0.08),
                          border: Border.all(color: AppTheme.primary.withOpacity(0.5), width: 1.5),
                        ),
                      ),
                      // Pet Marker
                      const Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.radio_button_checked, color: AppTheme.success, size: 28),
                          SizedBox(height: 4),
                          Text("Bruno (10.02345, 76.34567)", style: TextStyle(fontSize: 10, color: Colors.white70)),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),

                // Slider
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text("Virtual Safe Geofence Radius:", style: TextStyle(fontSize: 12, color: Color(0xFF94A3B8))),
                    Text("${_geofenceRadius.round()} meters", style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFFA5B4FC))),
                  ],
                ),
                Slider(
                  value: _geofenceRadius,
                  min: 100,
                  max: 1000,
                  divisions: 18,
                  activeColor: AppTheme.primary,
                  onChanged: (val) => setState(() => _geofenceRadius = val),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // MPU6050 Motion Classifier Card
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
                const Text("MPU6050 ML Activity Classifier", style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                const SizedBox(height: 8),
                const Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text("Current Activity State:", style: TextStyle(fontSize: 12, color: Color(0xFF94A3B8))),
                    Text("Walking (Active)", style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Color(0xFFC084FC))),
                  ],
                ),
                const SizedBox(height: 12),
                ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: _isBuzzerActive ? AppTheme.success : Colors.white10,
                    minimumSize: const Size(double.infinity, 42),
                  ),
                  onPressed: () {
                    setState(() => _isBuzzerActive = true);
                    Future.delayed(const Duration(seconds: 2), () {
                      if (mounted) setState(() => _isBuzzerActive = false);
                    });
                  },
                  icon: const Icon(Icons.volume_up, size: 18),
                  label: Text(_isBuzzerActive ? "Buzzer Sounding & LED Blinking..." : "Trigger Find-My-Pet Sound/LED"),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
