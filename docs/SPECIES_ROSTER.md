# Original Trilogy Species Roster — verified working baseline

**Scope:** animals visibly depicted in the released films *Jurassic Park* (1993), *The Lost World: Jurassic Park* (1997), and *Jurassic Park III* (2001). This is not the complete fictional InGen catalogue, the novels' fauna, or the later *Jurassic World* films.

**Status key**
- **Confirmed living animal:** a production/film reference describes the animal in a scene or identifies it in the on-screen creature list. Include it in the ambient simulation.
- **Brief/background:** confirmed, but shown only briefly or in a background herd. Include at lower frequency; do not mistake low screen time for an uncertain identification.
- **Prop/reference only:** skeleton, embryo, label, or dialogue reference. Do not spawn as a living animal on that evidence alone.
- **Separate flying reptile:** visibly present, but not a dinosaur taxonomically.

## Film-by-film roster

### Jurassic Park (1993)

| Taxon | Evidence in the released film | Simulation status |
|---|---|---|
| Brachiosaurus | First major dinosaur reveal; later browses near the sleeping children | Confirmed living animal |
| Dilophosaurus | Seen during the tour and in the Nedry sequence | Confirmed living animal |
| Gallimimus | Living herd and stampede sequence | Confirmed living animal |
| Parasaurolophus | Identified in the background of the first Brachiosaurus encounter | **Brief/background**, but confirmed |
| Triceratops | Extended sick-animal encounter beside the tour route | Confirmed living animal |
| Tyrannosaurus rex | Paddock escape and later scenes | Confirmed living animal |
| Velociraptor | Living animals in the opening incident, hatchery, and park sequences | Confirmed living animal |

**Prop-only:** Alamosaurus is identified as a skeleton in the visitor center. It is not a living animal in the film and is not part of the initial living simulation roster.

### The Lost World: Jurassic Park (1997)

| Taxon | Evidence in the released film | Simulation status |
|---|---|---|
| Compsognathus | Opening attack and later pack scenes | Confirmed living animal |
| Gallimimus | Appears in the InGen roundup/stampede material | Confirmed living animal |
| Mamenchisaurus | Large sauropods appear on the game trail | Confirmed living animal |
| Pachycephalosaurus | Captured animal and head-butting escape attempt | Confirmed living animal |
| Parasaurolophus | InGen roundup and capture sequence | Confirmed living animal |
| Stegosaurus | Adult and juvenile animals in the family encounter; later captured | Confirmed living animal |
| Triceratops | Animals are shown among those captured by InGen | Confirmed living animal |
| Tyrannosaurus rex | Two adults and an infant form the film's T. rex family | Confirmed living animal |
| Velociraptor | Tall-grass and facility sequences | Confirmed living animal |
| Pteranodon | Brief appearance at the film's end | **Separate flying reptile**, not a dinosaur |

### Jurassic Park III (2001)

The film's production summary supplies an explicit on-screen creature list. The dinosaur entries are:

| Taxon | Evidence in the released film | Simulation status |
|---|---|---|
| Ankylosaurus | Small groups encountered in the forest and by the river | Confirmed living animal |
| Brachiosaurus | Herd visible at the riverbank | Confirmed living animal |
| Ceratosaurus | Brief riverbank encounter | **Brief**, but confirmed |
| Compsognathus | Small animals visible during the Spinosaurus/T. rex encounter | Confirmed living animal |
| Corythosaurus | Mixed grazing herd with Parasaurolophus near the InGen compound | Confirmed living animal |
| Parasaurolophus | Mixed herd; also appears as prey | Confirmed living animal |
| Spinosaurus | Principal large predator; plane, river, and T. rex encounters | Confirmed living animal; explicitly prioritized |
| Stegosaurus | Brief sightings during the island journey | **Brief/background**, but listed on-screen |
| Triceratops | Brief herd sighting during the flight | **Brief/background**, but listed on-screen |
| Tyrannosaurus rex | Animal in the Spinosaurus fight | Confirmed living animal |
| Velociraptor | Nest, pursuit, and pack sequences | Confirmed living animal |
| Pteranodon | Aviary sequence and escape at the end | **Separate flying reptile**, not a dinosaur |

## Consolidated living roster

The three films yield **15 distinct dinosaur taxa** for the living ecosystem:

1. Ankylosaurus
2. Brachiosaurus
3. Ceratosaurus
4. Compsognathus
5. Corythosaurus
6. Dilophosaurus
7. Gallimimus
8. Mamenchisaurus
9. Pachycephalosaurus
10. Parasaurolophus
11. Spinosaurus
12. Stegosaurus
13. Triceratops
14. Tyrannosaurus rex
15. Velociraptor

**Flying reptile roster:** Pteranodon. It must be implemented as a pterosaur with flight behaviour, not classified as a dinosaur.

## Taxonomy and evidence cautions

- The film calls its large dromaeosaurs **Velociraptor**, but the production design was based substantially on **Deinonychus** and is far larger than the real genus *Velociraptor*. Keep the film-facing name in the roster; use a deliberate hybrid of franchise silhouette and current dromaeosaur anatomy rather than silently renaming it.
- Burke's spoken label **“Compsognathus triassicus”** in *The Lost World* is a fictional composite name, not a valid species. The production reference explains it combines *Compsognathus longipes* with *Procompsognathus triassicus*. Use *Compsognathus* as the genus-level simulation entry.
- The *Jurassic Park* Dilophosaurus frill and venom-spitting are film inventions, not established paleontology. They may be retained as explicit franchise behaviour, not presented as scientific fact.
- Pteranodon is a pterosaur, not a dinosaur.
- Alamosaurus is a visitor-center skeleton in the first film, not a confirmed living animal.
- Baryonyx was considered during *Jurassic Park III* development as an alternative to Spinosaurus; neither Baryonyx nor Suchomimus appears in the released film's on-screen creature list. Do not add them to the living roster.
- Do not promote species names from embryo labels, park maps, merchandise, cut scenes, novels, or fan-maintained prop lists into the living roster without direct frame/production evidence. Any additional background silhouettes remain **unresolved**, not confirmed species.

## Implementation priority

1. First complete the current three prototype animals (T. rex, Brachiosaurus, Gallimimus) with proper 3D anatomy and locomotion.
2. Add the remaining confirmed living dinosaurs in ecological groups: small theropods; hadrosaurs/ornithopods; armored and horned herbivores; additional sauropods; then the remaining large predators.
3. Add Pteranodon as a separate flight-capable creature system.
4. Keep brief/background species at low initial population density; the screen-time frequency is not a reason to omit them.
5. Build Spinosaurus as a distinct large theropod with a sail and semi-aquatic/shoreline activity. Its original short melodic proximity cue remains a separate audio task.

## References

- *Jurassic Park* — production and “Dinosaurs on screen” summary, including the background Parasaurolophus and Alamosaurus skeleton: https://en.wikipedia.org/wiki/Jurassic_Park
- *The Lost World: Jurassic Park* — “Creatures on screen” production summary, including the Compsognathus, Mamenchisaurus, Pachycephalosaurus, Stegosaurus, Triceratops, T. rex family, and Velociraptor details: https://en.wikipedia.org/wiki/The_Lost_World:_Jurassic_Park
- *Jurassic Park III* — “Creatures on screen” production history and explicit on-screen creature list; also documents the Ankylosaurus, Brachiosaurus, Ceratosaurus, Corythosaurus, Spinosaurus, and Pteranodon production work: https://en.wikipedia.org/wiki/Jurassic_Park_III
- Paleontology World, “Jurassic Park: Every Dinosaur In The Original Trilogy” (2020), used as a scene-level cross-check; the article itself credits ScreenRant as its source: https://www.paleontologyworld.com/entertainment/jurassic-park-every-dinosaur-original-trilogy

**Confidence policy:** this is a reliable working roster for development, not a frame-by-frame forensic audit of every distant silhouette. The explicit film creature lists and production descriptions support the 15 living dinosaur taxa plus Pteranodon. Any newly noticed background candidate must be verified against the released film before it is promoted from unresolved to confirmed.
