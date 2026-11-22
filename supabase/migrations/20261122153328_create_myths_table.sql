/*
# Create myths table for the Library of Myths

## Purpose
Stores the collection of myths/legends displayed on the site. This is a
single-tenant, no-auth app: the data is intentionally public and read-only
from the frontend, so every policy targets `anon, authenticated` and allows
SELECT only.

## 1. New Tables
- `myths`
  - `id`            uuid, primary key
  - `title`         text, not null — name of the myth
  - `culture`       text, not null — origin culture (e.g. "Greek")
  - `description`   text, not null — short blurb shown on the card
  - `author`        text, not null — credited author/source
  - `story`         text, not null — full tale shown in the Read modal
  - `artwork`       text, not null — key identifying which SVG illustration to render
  - `sort_order`    int, default 0 — display ordering
  - `created_at`    timestamptz, default now()

## 2. Security
- Enable RLS on `myths`.
- Grant SELECT to `anon` + `authenticated` so the Data API can read the rows.
- Add a SELECT-only policy (USING true) because the collection is public and
  the frontend only reads it; no INSERT/UPDATE/DELETE from the app.
- service_role granted full CRUD for maintenance via the SQL tools.

## 3. Seed data
- Inserts 12 myths spanning Greek, Norse, Egyptian, Japanese, Celtic, Hindu,
  Mesoamerican, Mesopotamian, African, and Chinese traditions.
*/

CREATE TABLE IF NOT EXISTS myths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  culture text NOT NULL,
  description text NOT NULL,
  author text NOT NULL,
  story text NOT NULL,
  artwork text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE myths ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON myths TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON myths TO service_role;

DROP POLICY IF EXISTS "public_read_myths" ON myths;
CREATE POLICY "public_read_myths"
ON myths FOR SELECT
TO anon, authenticated
USING (true);

-- Seed the collection. Each row references an `artwork` key that maps to an
-- SVG illustration rendered in the frontend. sort_order controls display.
INSERT INTO myths (title, culture, description, author, story, artwork, sort_order) VALUES
(
  'The Fire of Prometheus',
  'Greek',
  'A Titan defies the gods of Olympus to gift fire — and the spark of knowledge — to mortal kind.',
  'Hesiod',
  'In the age before memory, when mortals shivered in caves and ate their meat raw, the Titan Prometheus looked upon them with pity. From the forge of Hephaestus he stole a single ember, hiding it within a hollow fennel stalk, and carried it down to the children of clay. With fire came warmth, cooking, metalwork, and the first glimmerings of civilization. But Zeus, lord of the sky, would not let such defiance go unpunished. Prometheus was bound to a pillar of the Caucasus, and each day an eagle came to feast upon his liver, which grew back each night — an eternal sentence for the crime of compassion.',
  'prometheus', 1
),
(
  'The Twilight of the Gods',
  'Norse',
  'The doom of gods and men foretold in the Eddas — a final winter, a devouring wolf, and a world drowned in flame.',
  'Snorri Sturluson',
  'Three winters come without summer between them, a time the skalds call the Fimbulwinter. The sun and moon are swallowed by the wolves Sköll and Hati. The trickster Loki breaks his bonds and sails a ship of the dead; his son the World-Serpent rises from the sea, venom dripping from his jaws. Odin rides to meet the wolf Fenrir, and Thor grapples the serpent one final time. The fire-giant Surtr flings his sword, and the nine worlds burn. Yet from the ash, a new green earth rises, and two humans who hid within the World-Tree begin the tale anew.',
  'ragnarok', 2
),
(
  'The Weighing of the Heart',
  'Egyptian',
  'In the Hall of Two Truths, a jackal-headed god weighs a soul against the feather of Ma’at.',
  'The Book of the Dead',
  'When a soul descends into the west, it must walk the long road to the Hall of Two Truths. There stands Anubis, jackal-headed, guide of the dead. He takes the heart of the deceased and places it upon the great scales. Against it he sets the feather of Ma’at — the order of the cosmos, truth itself. Should the heart be lighter than the feather, the soul goes forth to the Field of Reeds. Should it be heavy with wrongdoing, the monster Ammit waits beneath the scales, devourer of the unworthy, and the soul is unmade forever.',
  'anubis', 3
),
(
  'The Sun Behind the Rock',
  'Japanese',
  'The sun goddess hides within a heavenly cave, and the world is plunged into darkness until laughter draws her out.',
  'Kojiki',
  'Angered by the ravages of her brother Susanoo, the sun goddess Amaterasu retreated into the Heavenly Rock Cave and sealed the entrance. The world fell into perpetual night; gods and men despaired. On the riverbank of heaven, the gods gathered and devised a ruse. They hung a sacred mirror upon a tree, and the goddess Ama-no-Uzume danced upon an upturned tub, stamping and baring herself until the assembled gods roared with laughter. Curious at the noise, Amaterasu cracked open the cave, caught sight of her own radiant reflection, and was drawn forth — and the light of the world returned.',
  'amaterasu', 4
),
(
  'The Raven Queen’s Prophecy',
  'Celtic',
  'A goddess of battle and fate circles the field of war, her cry deciding who will live and who will fall.',
  'The Ulster Cycle',
  'When armies gather, the Morrigan comes. She is not one but three — maiden, mother, and crone woven into a single will. She flies above the carnage as a raven, her cry striking dread into the hearts of warriors. Before the battle she may wash the garments of those marked for death, and none who see her at the ford return home. Yet she is also the goddess of sovereignty, who chooses a king by granting him the land itself. To meet her is to meet the turning of fate, and her prophecy at the end of the world is silence.',
  'morrigan', 5
),
(
  'The Hoard of Fafnir',
  'Norse',
  'A dwarf consumed by greed is twisted into a dragon, coiled upon his gold — until a Volsung comes seeking glory.',
  'Völsunga Saga',
  'Fafnir began as a dwarf, son of the king Hreidmar. When the gods paid weregild in cursed gold, the lust of it poisoned his heart. He murdered his father, drove away his brother, and carried the hoard to a barren heath. There, curled upon his treasure, his body hardened into scales, his breath became venom, and he was a dragon. For years none dared approach, until the hero Sigurd, descendant of Odin, dug a trench upon the path the wyrm crawled to drink. As Fafnir slid overhead, Sigurd drove his blade into the heart of the beast — and tasted the worm’s blood, and so learned the speech of birds.',
  'fafnir', 6
),
(
  'The Churning of the Ocean',
  'Hindu',
  'Gods and demons join forces to churn the cosmic sea for the nectar of immortality — and unleash wonders and terrors.',
  'The Mahabharata',
  'When the gods began to weaken, they made a perilous pact with their eternal enemies, the asuras. Together they would churn the ocean of milk to draw out amrita, the nectar of immortality. They used Mount Mandara as a churning staff and the serpent Vasuki as a rope, pulling back and forth until the mountain sank. Vishnu took the form of a great tortoise to bear the mountain on his back. From the churning rose the wish-granting cow, the elephant Airavata, the goddess of fortune, and finally the physician Dhanvantari bearing the cup of nectar. But before it, rose the Kalakuta poison — so deadly it could end all worlds, which Shiva caught in his throat and held there, turning his neck blue forever.',
  'churning', 7
),
(
  'The Fall of Quetzalcoatl',
  'Mesoamerican',
  'The feathered serpent king is betrayed by his own reflection and sets sail east on a raft of serpents.',
  'Codex Chimalpopoca',
  'Quetzalcoatl, the feathered serpent, was lord of Tollan, a city of gold and wisdom. He forbade sacrifice and taught the arts of peace. But his enemies, the sorcerers of the smoking mirror, tricked him. They showed him a mirror and he saw his face for the first time, and shame fell upon him. They offered him pulque, and he drank until his reason fled. In his shame and drunkenness he lay with a priestess and broke his own laws. Grieving, he built a raft of serpents, dressed in his finest feathers, and set himself aflame. His heart rose into the sky to become the morning star, and the people waited for his return from the east.',
  'quetzalcoatl', 8
),
(
  'Descent of Inanna',
  'Mesopotamian',
  'The queen of heaven walks into the underworld and is struck dead — only to rise again through a bargain of substitutes.',
  'Sumerian Hymns',
  'Inanna, queen of heaven and earth, set her heart on the underworld, the domain of her sister Ereshkigal. At each of the seven gates she was forced to surrender a garment or jewel of her power, arriving naked and bowed before the throne. There the judges of the dead struck her, and she hung as a corpse upon a hook. But the god Enki fashioned servants who could enter the underworld, and they comforted Ereshkigal in her labor pains until she offered a gift. They asked for the corpse of Inanna, and the queen was revived and rose back through the gates. Yet someone must take her place below — and she chose her husband Dumuzi, who had not mourned her, to descend for half the year.',
  'inanna', 9
),
(
  'The Anansi Spins the World',
  'West African',
  'A trickster spider buys all the stories of the world from the sky god for a price of living things.',
  'Ashanti folklore',
  'Anansi the spider was small, but his cunning was vast. The sky god Nyame owned every story in the world, and Anansi longed to own them so that his name would be on every tongue. Nyame set an impossible price: the hornets, the python, and the leopard. Anansi trapped the hornets by offering them shelter from rain and corking the gourd. He tricked the python into measuring himself against a branch and bound him fast. He dug a pit and caught the leopard, then pretended to help him out only to bind him too. Nyame, astonished, gave Anansi all the tales of the world — and so it is that every story told is, in some way, Anansi’s.',
  'anansi', 10
),
(
  'Nüwa Mends the Sky',
  'Chinese',
  'A serpent goddess melts five-colored stones to patch a shattered heaven and save the world from drowning.',
  'Huainanzi',
  'In the age of giants, the water god Gong Gong, in a fury of defeat, struck his head against Mount Buzhou — one of the pillars of heaven. The sky tore open, the northwest tilted, and floods poured across the earth while fire roared unchecked. Nüwa, creator of humanity, a goddess with the body of a serpent, could not bear her children to perish. She gathered stones of five colors and melted them into a molten paste to patch the sky. She severed the legs of the great turtle Ao and set them as pillars to hold heaven up again. She gathered the ashes of reeds to stop the floods. Heaven was healed, but it would never sit quite level again — and that is why the rivers of China run east.',
  'nuwa', 11
),
(
  'Orpheus and the Lyre',
  'Greek',
  'A musician walks into the land of the dead to reclaim his love, on one condition he cannot keep.',
  'Ovid',
  'Orpheus was the greatest musician who ever lived; his lyre was given him by Apollo, and his songs could move stones and calm wild beasts. When his bride Eurydice died of a serpent’s bite on their wedding day, Orpheus descended into the underworld, playing songs so mournful that the ghosts wept and the Furies were stayed. Hades and Persephone agreed to let Eurydice follow him back to the living world on a single condition: that he walk ahead and not look back until they had emerged. He climbed the dark road, and at the very last step, doubt overcame him. He turned — and saw her vanish back into shadow, gone for ever. He played on, mourning, until the Maenads tore him apart, and his head floated down the river still singing her name.',
  'orpheus', 12
)
ON CONFLICT DO NOTHING;
