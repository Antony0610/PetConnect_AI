class PetModel {
  final String name;
  final String breed;
  final double age;
  final double weight;
  final String microchip;
  final String collarId;
  final String primaryVet;

  PetModel({
    required this.name,
    required this.breed,
    required this.age,
    required this.weight,
    required this.microchip,
    required this.collarId,
    required this.primaryVet,
  });

  static PetModel defaultBruno() {
    return PetModel(
      name: "Bruno",
      breed: "Golden Retriever",
      age: 3.5,
      weight: 28.4,
      microchip: "981020004812901",
      collarId: "ESP32-COLLAR-88",
      primaryVet: "Dr. Sarah Jenkins",
    );
  }
}
