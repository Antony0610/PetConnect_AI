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
        title: const Row(
          children: [
            Icon(Icons.warning_amber_rounded, color: AppTheme.danger),
            SizedBox(width: 8),
            Text("Confirm SOS Alert?", style: TextStyle(color: Colors.white, fontSize: 16)),
          ],
        ),
        content: const Text(
          "Broadcast Bruno's live GPS collar location and QR health record to nearby emergency vet clinics?",
          style: TextStyle(color: Color(0xFF94A3B8), fontSize: 13),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text("Cancel"),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: AppTheme.danger),
            onPressed: () {
              Navigator.pop(ctx);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text("🚨 Emergency SOS Dispatched to 32 nearby clinics & volunteers!"),
                  backgroundColor: AppTheme.danger,
                ),
              );
            },
            child: const Text("Dispatch SOS", style: TextStyle(color: Colors.white)),
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
        backgroundColor: const Color(0xEB070913),
        elevation: 0,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: AppTheme.primary,
                borderRadius: BorderRadius.circular(10),
              ),
              child: const Icon(Icons.pets, color: Colors.white, size: 20),
            ),
            const SizedBox(width: 10),
            const Column(
              crossAxisAlignment: CrossAlignment.start,
              children: [
                Text("PetConnect AI", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                Text("5-Volume Flutter Application", style: TextStyle(fontSize: 10, color: Color(0xFF94A3B8))),
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
        backgroundColor: const Color(0xFF0F172A),
        selectedItemColor: AppTheme.primary,
        unselectedItemColor: const Color(0xFF64748B),
        selectedFontSize: 11,
        unselectedFontSize: 10,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.map), label: "Vol 1 Core"),
          BottomNavigationBarItem(icon: Icon(Icons.psychology), label: "Vol 2 AI"),
          BottomNavigationBarItem(icon: Icon(Icons.radio), label: "Vol 3 Collar"),
          BottomNavigationBarItem(icon: Icon(Icons.favorite), label: "Vol 4 SOS"),
          BottomNavigationBarItem(icon: Icon(Icons.developer_board), label: "Vol 5 Arch"),
        ],
      ),
    );
  }
}
