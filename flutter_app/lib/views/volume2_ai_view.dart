import 'package:flutter/material';
import 'package:google_fonts/google_fonts';
import '../theme/app_theme.dart';

class Volume2AIView extends StatefulWidget {
  const Volume2AIView({super.key});

  @override
  State<Volume2AIView> createState() => _Volume2AIViewState();
}

class _Volume2AIViewState extends State<Volume2AIView> {
  int _selectedModule = 0;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAlignment.start,
        children: [
          // Header
          Text("Volume 2: AI & Computer Vision Intelligence", style: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
          const SizedBox(height: 12),

          // Selector Tabs
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: [
                _tabButton("1. Breed Scanner", 0),
                _tabButton("2. Siamese Matcher", 1),
                _tabButton("3. Adoption Match", 2),
                _tabButton("4. Health Assistant", 3),
              ],
            ),
          ),
          const SizedBox(height: 20),

          if (_selectedModule == 0) _buildBreedScanner(),
          if (_selectedModule == 1) _buildSiameseMatcher(),
          if (_selectedModule == 2) _buildAdoptionRecommender(),
          if (_selectedModule == 3) _buildHealthAssistant(),
        ],
      ),
    );
  }

  Widget _tabButton(String title, int index) {
    bool isSelected = _selectedModule == index;
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: ChoiceChip(
        label: Text(title),
        selected: isSelected,
        selectedColor: AppTheme.primary,
        onSelected: (val) => setState(() => _selectedModule = index),
      ),
    );
  }

  Widget _buildBreedScanner() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.bgCard,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0x1AFFFFFF)),
      ),
      child: Column(
        crossAxisAlignment: CrossAlignment.start,
        children: [
          Text("MobileNetV3 AI Breed & Health Classifier", style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 12),
          Container(
            height: 140,
            width: double.infinity,
            decoration: BoxDecoration(
              color: Colors.black38,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.white24),
            ),
            child: const Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.camera_alt, size: 36, color: Color(0xFF818CF8)),
                SizedBox(height: 8),
                Text("Golden Retriever Scan Selected", style: TextStyle(color: Colors.white70, fontSize: 13)),
              ],
            ),
          ),
          const SizedBox(height: 16),
          _metricRow("Detected Breed", "Golden Retriever (96.4%)"),
          _metricRow("Est. Age Group", "3 – 4 Years"),
          _metricRow("Skin Health", "Clear (No irritations)"),
          _metricRow("Eye Check", "Normal (Clear vision)"),
        ],
      ),
    );
  }

  Widget _buildSiameseMatcher() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.bgCard,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0x1AFFFFFF)),
      ),
      child: Column(
        crossAxisAlignment: CrossAlignment.start,
        children: [
          Text("Siamese Neural Network Facial Matcher", style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          const Text("Cosine Similarity Score: 94.2% (High Confidence Match)", style: TextStyle(color: Color(0xFF34D399), fontWeight: FontWeight.bold)),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: Container(
                  height: 100,
                  color: Colors.white10,
                  child: const Center(child: Text("Owner Missing Report", textAlign: TextAlign.center, style: TextStyle(fontSize: 11))),
                ),
              ),
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 8),
                child: Icon(Icons.compare_arrows, color: AppTheme.primary),
              ),
              Expanded(
                child: Container(
                  height: 100,
                  color: Colors.white10,
                  child: const Center(child: Text("Finder Sighted Photo", textAlign: TextAlign.center, style: TextStyle(fontSize: 11))),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildAdoptionRecommender() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.bgCard,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0x1AFFFFFF)),
      ),
      child: const Column(
        crossAxisAlignment: CrossAlignment.start,
        children: [
          Text("AI Smart Adoption Matchmaker", style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          SizedBox(height: 10),
          Text("Recommended Pet: Golden Retriever Mix", style: TextStyle(fontSize: 14, color: Color(0xFFA5B4FC), fontWeight: FontWeight.bold)),
          SizedBox(height: 4),
          Text("Compatibility Score: 95% (Family friendly, WFH lifestyle compatible)", style: TextStyle(fontSize: 12, color: Colors.white70)),
        ],
      ),
    );
  }

  Widget _buildHealthAssistant() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.bgCard,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0x1AFFFFFF)),
      ),
      child: const Column(
        crossAxisAlignment: CrossAlignment.start,
        children: [
          Text("AI Pet Health Symptom Triage Assistant", style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          SizedBox(height: 8),
          Text("User: 'My dog is not eating food today.'", style: TextStyle(color: Colors.white70, fontSize: 12)),
          SizedBox(height: 6),
          Text("AI: Loss of appetite can stem from mild indigestion. Ensure fresh water is available. If inappetence continues over 24h, consult a veterinarian.", style: TextStyle(color: Color(0xFF38BDF8), fontSize: 12)),
        ],
      ),
    );
  }

  Widget _metricRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 12)),
          Text(value, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13)),
        ],
      ),
    );
  }
}
