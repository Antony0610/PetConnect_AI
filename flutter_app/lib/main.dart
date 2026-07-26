import 'package:flutter/material.dart';
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
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.dark,
      home: const MainHomeScreen(),
    );
  }
}

class MainHomeScreen extends StatefulWidget {
  const MainHomeScreen({super.key});

  @override
  State<MainHomeScreen> createState() => _MainHomeScreenState();
}

class _MainHomeScreenState extends State<MainHomeScreen> with SingleTickerProviderStateMixin {
  int _currentIndex = 0;
  final PetModel _pet = PetModel.defaultBruno();

  void _triggerSOSDialog() {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: const Color(0xFA0F172A),
        elevation: 10,
        shadowColor: AppTheme.error.withOpacity(0.5),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: AppTheme.error.withOpacity(0.18),
                shape: BoxShape.circle,
              ),
              child: const Icon(Icons.warning_amber_rounded, color: AppTheme.error, size: 26),
            ),
            const SizedBox(width: 12),
            const Text(
              "Confirm Emergency SOS?",
              style: TextStyle(
                fontFamily: 'Poppins',
                color: Colors.white,
                fontSize: 17,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
        content: const Text(
          "Broadcast Bruno's live GPS collar location and QR health record to 32 nearby emergency vet clinics and rescue volunteers?",
          style: TextStyle(
            fontFamily: 'Inter',
            color: Color(0xFF94A3B8),
            fontSize: 13,
            height: 1.4,
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text("Cancel", style: TextStyle(fontFamily: 'Inter', color: Color(0xFF94A3B8))),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.error,
              elevation: 4,
              shadowColor: AppTheme.error.withOpacity(0.4),
              shape: const StadiumBorder(),
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
            ),
            onPressed: () {
              Navigator.pop(ctx);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Row(
                    children: [
                      Icon(Icons.check_circle_rounded, color: Colors.white, size: 20),
                      SizedBox(width: 10),
                      Expanded(
                        child: Text(
                          "Emergency SOS Dispatched to nearby clinics & volunteers!",
                          style: TextStyle(fontFamily: 'Inter', fontWeight: FontWeight.w600),
                        ),
                      ),
                    ],
                  ),
                  backgroundColor: AppTheme.error,
                  behavior: SnackBarBehavior.floating,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(16))),
                ),
              );
            },
            child: const Text("Dispatch SOS", style: TextStyle(fontFamily: 'Inter', color: Colors.white, fontWeight: FontWeight.bold)),
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
        backgroundColor: const Color(0xEB070D18),
        elevation: 0,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [AppTheme.primary, Color(0xFF094E4A)],
                ),
                borderRadius: BorderRadius.circular(14),
                boxShadow: [
                  BoxShadow(color: AppTheme.primary.withOpacity(0.4), blurRadius: 14, offset: const Offset(0, 4)),
                ],
              ),
              child: const Icon(Icons.pets_rounded, color: Colors.white, size: 20),
            ),
            const SizedBox(width: 12),
            const Column(
              crossAxisAlignment: CrossAlignment.start,
              children: [
                Text(
                  "PetConnect AI",
                  style: TextStyle(
                    fontFamily: 'Poppins',
                    fontWeight: FontWeight.bold,
                    fontSize: 17,
                    color: Colors.white,
                  ),
                ),
                Text(
                  "Smart Pet Healthcare Platform",
                  style: TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 10,
                    color: AppTheme.secondary,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.warning_amber_rounded, color: AppTheme.accent),
            onPressed: _triggerSOSDialog,
            tooltip: "Emergency SOS",
          ),
        ],
      ),
      body: AnimatedSwitcher(
        duration: const Duration(milliseconds: 300),
        switchInCurve: Curves.easeOutCubic,
        switchOutCurve: Curves.easeInCubic,
        child: pages[_currentIndex],
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (idx) => setState(() => _currentIndex = idx),
        backgroundColor: const Color(0xFF09101F),
        indicatorColor: AppTheme.primary.withOpacity(0.25),
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.dashboard_outlined, color: Color(0xFF64748B)),
            selectedIcon: Icon(Icons.dashboard_rounded, color: AppTheme.secondary),
            label: "Dashboard",
          ),
          NavigationDestination(
            icon: Icon(Icons.psychology_outlined, color: Color(0xFF64748B)),
            selectedIcon: Icon(Icons.psychology_rounded, color: AppTheme.secondary),
            label: "AI Studio",
          ),
          NavigationDestination(
            icon: Icon(Icons.sensors_outlined, color: Color(0xFF64748B)),
            selectedIcon: Icon(Icons.sensors_rounded, color: AppTheme.secondary),
            label: "Collar Tracker",
          ),
          NavigationDestination(
            icon: Icon(Icons.favorite_outline_rounded, color: Color(0xFF64748B)),
            selectedIcon: Icon(Icons.favorite_rounded, color: AppTheme.accent),
            label: "SOS Passport",
          ),
          NavigationDestination(
            icon: Icon(Icons.insights_outlined, color: Color(0xFF64748B)),
            selectedIcon: Icon(Icons.insights_rounded, color: AppTheme.secondary),
            label: "Analytics",
          ),
        ],
      ),
    );
  }
}
