import 'package:flutter/material';
import 'theme/app_theme.dart';
import 'models/pet_model.dart';
import 'views/volume1_core_view.dart';
import 'views/volume2_ai_view.dart';
import 'views/volume3_collar_view.dart';
import 'views/volume4_sos_health_view.dart';
import 'views/volume5_architecture_view.dart';

void main() {
  runApp(const PetConnectApp());
}

class PetConnectApp extends StatelessWidget {
  const PetConnectApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PetConnect AI',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme,
      home: const MainHomeScreen(),
    );
  }
}

class MainHomeScreen extends StatefulWidget {
  const MainHomeScreen({super.key});

  @override
  State<MainHomeScreen> createState() => _MainHomeScreenState();
}

class _MainHomeScreenState extends State<MainHomeScreen> {
  int _currentIndex = 0;
  final PetModel _pet = PetModel.defaultBruno();

  void _triggerSOSDialog() {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: const Color(0xFF0F172A),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: const Row(
          children: [
            Icon(Icons.warning_amber_rounded, color: AppTheme.danger, size: 28),
            SizedBox(width: 10),
            Text("Confirm Emergency SOS?", style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
          ],
        ),
        content: const Text(
          "Broadcast Bruno's live GPS collar location and QR health record to 32 nearby emergency vet clinics and rescue volunteers?",
          style: TextStyle(color: Color(0xFF94A3B8), fontSize: 13, height: 1.4),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text("Cancel", style: TextStyle(color: Color(0xFF94A3B8))),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.danger,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            onPressed: () {
              Navigator.pop(ctx);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text("🚨 Emergency SOS Dispatched to nearby clinics & volunteers!"),
                  backgroundColor: AppTheme.danger,
                ),
              );
            },
            child: const Text("Dispatch SOS", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final List<Widget> pages = [
      Volume1CoreView(pet: _pet),
      const Volume2AIView(),
      const Volume3CollarView(),
      Volume4SOSHealthView(pet: _pet, onTriggerSOS: _triggerSOSDialog),
      const Volume5ArchitectureView(),
    ];

    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xEB050811),
        elevation: 0,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [AppTheme.primary, AppTheme.accentPurple],
                ),
                borderRadius: BorderRadius.circular(12),
                boxShadow: const [
                  BoxShadow(color: Color(0x406366F1), blurRadius: 12),
                ],
              ),
              child: const Icon(Icons.pets, color: Colors.white, size: 20),
            ),
            const SizedBox(width: 12),
            const Column(
              crossAxisAlignment: CrossAlignment.start,
              children: [
                Text("PetConnect AI", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 17, color: Colors.white)),
                Text("Smart Pet Collar & Ecosystem", style: TextStyle(fontSize: 10, color: Color(0xFF94A3B8))),
              ],
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.warning, color: AppTheme.danger),
            onPressed: _triggerSOSDialog,
            tooltip: "Emergency SOS",
          ),
        ],
      ),
      body: pages[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (idx) => setState(() => _currentIndex = idx),
        type: BottomNavigationBarType.fixed,
        backgroundColor: const Color(0xFF0D1323),
        selectedItemColor: AppTheme.primary,
        unselectedItemColor: const Color(0xFF64748B),
        selectedFontSize: 11,
        unselectedFontSize: 10,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.dashboard_rounded), label: "Dashboard"),
          BottomNavigationBarItem(icon: Icon(Icons.psychology_rounded), label: "AI Studio"),
          BottomNavigationBarItem(icon: Icon(Icons.radio_rounded), label: "Collar Tracker"),
          BottomNavigationBarItem(icon: Icon(Icons.favorite_rounded), label: "SOS Passport"),
          BottomNavigationBarItem(icon: Icon(Icons.analytics_rounded), label: "Analytics"),
        ],
      ),
    );
  }
}
