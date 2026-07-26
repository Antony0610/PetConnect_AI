import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class Volume3CollarView extends StatefulWidget {
  const Volume3CollarView({super.key});

  @override
  State<Volume3CollarView> createState() => _Volume3CollarViewState();
}

class _Volume3CollarViewState extends State<Volume3CollarView> {
  double _geofenceRadius = 350;
  bool _isBuzzerActive = false;
  bool _isReplayingRoute = false;
  double _replayProgress = 0.0;

  void _toggleRouteReplay() {
    setState(() {
      _isReplayingRoute = !_isReplayingRoute;
      if (_isReplayingRoute) {
        _replayProgress = 0.3;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAlignment.start,
        children: [
          // Header Card
          Card(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Row(
                        children: [
                          Icon(Icons.sensors_rounded, color: AppTheme.secondary, size: 22),
                          SizedBox(width: 8),
                          Text(
                            "ESP32 GPS Collar Telemetry",
                            style: TextStyle(
                              fontFamily: 'Poppins',
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppTheme.success.withOpacity(0.16),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: AppTheme.success.withOpacity(0.35)),
                        ),
                        child: const Row(
                          children: [
                            Icon(Icons.circle, color: AppTheme.success, size: 8),
                            SizedBox(width: 4),
                            Text("Safe Zone", style: TextStyle(color: AppTheme.success, fontSize: 11, fontWeight: FontWeight.bold)),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  const Text(
                    "Dual-Mode 4G NB-IoT + LoRaWAN Telemetry Streaming",
                    style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12),
                  ),

                  const SizedBox(height: 16),

                  // Simulated Map Container
                  Container(
                    height: 180,
                    width: double.infinity,
                    decoration: BoxDecoration(
                      color: const Color(0xFF040814),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: Colors.white.withOpacity(0.1)),
                    ),
                    child: Stack(
                      alignment: Alignment.center,
                      children: [
                        // Safe Zone Boundary Circle
                        Container(
                          width: (_geofenceRadius / 350) * 120,
                          height: (_geofenceRadius / 350) * 120,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: AppTheme.primary.withOpacity(0.12),
                            border: Border.all(color: AppTheme.secondary.withOpacity(0.6), width: 2),
                          ),
                        ),
                        // Pet Location Indicator
                        Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Container(
                              padding: const EdgeInsets.all(8),
                              decoration: BoxDecoration(
                                color: AppTheme.primary,
                                shape: BoxShape.circle,
                                boxShadow: [
                                  BoxShadow(color: AppTheme.secondary.withOpacity(0.5), blurRadius: 12),
                                ],
                              ),
                              child: const Icon(Icons.location_on_rounded, color: Colors.white, size: 20),
                            ),
                            const SizedBox(height: 4),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                              decoration: BoxDecoration(
                                color: Colors.black.withOpacity(0.85),
                                borderRadius: BorderRadius.circular(6),
                              ),
                              child: const Text(
                                "Bruno [10.02345 N, 76.34567 E]",
                                style: TextStyle(color: AppTheme.secondary, fontSize: 10, fontWeight: FontWeight.bold),
                              ),
                            ),
                          ],
                        ),
                        // Satellite Info HUD
                        Positioned(
                          top: 10,
                          left: 12,
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            decoration: BoxDecoration(
                              color: Colors.black.withOpacity(0.6),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: const Text("📡 14 Satellites • 3.4 km/h", style: TextStyle(color: Colors.white70, fontSize: 10)),
                          ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 14),

                  // Radius Control Slider
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text("Safe Geofence Radius:", style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12)),
                      Text("${_geofenceRadius.round()} meters", style: const TextStyle(color: AppTheme.secondary, fontWeight: FontWeight.bold, fontSize: 13)),
                    ],
                  ),
                  Slider(
                    value: _geofenceRadius,
                    min: 100,
                    max: 1000,
                    divisions: 18,
                    activeColor: AppTheme.primary,
                    inactiveColor: Colors.white.withOpacity(0.1),
                    onChanged: (val) => setState(() => _geofenceRadius = val),
                  ),

                  // Route Replay Widget
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.black.withOpacity(0.3),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.white.withOpacity(0.08)),
                    ),
                    child: Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text("24-Hour Route Breadcrumb Replay", style: TextStyle(color: Colors.white70, fontSize: 11, fontWeight: FontWeight.w600)),
                            InkWell(
                              onTap: _toggleRouteReplay,
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                decoration: BoxDecoration(
                                  color: AppTheme.secondary.withOpacity(0.15),
                                  borderRadius: BorderRadius.circular(6),
                                ),
                                child: Row(
                                  children: [
                                    Icon(_isReplayingRoute ? Icons.pause_rounded : Icons.play_arrow_rounded, color: AppTheme.secondary, size: 14),
                                    const SizedBox(width: 4),
                                    Text(_isReplayingRoute ? "Pause" : "Play Replay", style: const TextStyle(color: AppTheme.secondary, fontSize: 11, fontWeight: FontWeight.bold)),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                        if (_isReplayingRoute) ...[
                          const SizedBox(height: 8),
                          LinearProgressIndicator(
                            value: _replayProgress,
                            backgroundColor: Colors.white.withOpacity(0.1),
                            color: AppTheme.secondary,
                          ),
                        ],
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),

          const SizedBox(height: 16),

          // Hardware Controls Card
          Card(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAlignment.start,
                children: [
                  const Row(
                    children: [
                      Icon(Icons.tune_rounded, color: AppTheme.accent, size: 20),
                      SizedBox(width: 8),
                      Text(
                        "Collar Hardware Controls",
                        style: TextStyle(
                          fontFamily: 'Poppins',
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),

                  Row(
                    children: [
                      Expanded(
                        child: OutlinedButton.icon(
                          style: OutlinedButton.styleFrom(
                            padding: const EdgeInsets.symmetric(vertical: 12),
                            shape: const StadiumBorder(),
                            side: BorderSide(color: Colors.white.withOpacity(0.2)),
                          ),
                          onPressed: () => setState(() => _isBuzzerActive = !_isBuzzerActive),
                          icon: Icon(Icons.volume_up_rounded, color: _isBuzzerActive ? AppTheme.accent : Colors.white, size: 18),
                          label: Text(
                            _isBuzzerActive ? "Buzzer Sounding..." : "Find-My-Pet Sound",
                            style: const TextStyle(color: Colors.white, fontSize: 12),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
