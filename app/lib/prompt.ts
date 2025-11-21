import { WeatherData } from "./weather";

/**
 * Art styles to randomly choose from for the weather infographic.
 * Each entry includes the style name and guidance for how weather affects the visuals.
 */
export const ART_STYLES: string[] = [
  "Noir Detective Comic - A trench-coated detective walks through rainy streets, with weather conditions revealed through shadowy crime scene evidence boards. Sunny days show the detective finally catching their culprit.",

  "Kawaii Anime Mascot - A cute cloud-shaped character changes outfits and expressions based on weather conditions. Rain makes them cry adorably, sun gives them sunglasses and a smile.",

  "Medieval Tapestry - A kingdom's weather is depicted through a royal court's daily activities in woven textile style. Peasants and nobles react to conditions with period-appropriate clothing and gestures.",

  "Vintage Travel Poster - Each day is a retro 1950s destination poster featuring an optimistic traveler. Weather determines their outfit and the poster's color palette and typography.",

  "Cave Painting Primitive - A stick-figure hunter reacts to weather through prehistoric cave art symbols. Different weather conditions show them seeking shelter, hunting, or celebrating around fire.",

  "Art Deco Elegance - A glamorous 1920s flapper changes elaborate geometric outfits matching weather conditions. Gold, bronze, and jewel tones shift with forecast changes.",

  "Pixel Art RPG Character - An 8-bit adventurer sprite equips different gear and faces weather-based obstacles on their journey. Boss battles occur during storms, peaceful villages appear during clear weather.",

  "Watercolor Fairy Tale - A whimsical forest creature guides viewers through an enchanted week with soft, bleeding colors. Each weather type reveals different magical beings in their habitat.",

  "Paper Cut Shadow Box - Layered paper silhouettes create depth showing a figure's daily routine adapting to weather. Multiple paper layers cast different shadows based on conditions.",

  "Street Art Graffiti - An urban character spray-painted on a wall changes accessories and background tags daily. Weather affects the wall's appearance with drips, fading, or bright colors.",

  "Ukiyo-e Japanese Woodblock - A traveler crosses bridges and mountains in traditional Edo period style with weather depicted through classic wave and cloud patterns. Mount Fuji appears clearer or hazier based on conditions.",

  "Film Noir Silhouette - A mysterious figure's shadow against venetian blinds changes posture and props with weather. Light and shadow ratios shift dramatically with each forecast.",

  "Children's Crayon Drawing - A kid's imaginative weather friend drawn in clumsy, colorful wax crayon strokes. The character's smile or frown and stick-figure proportions shift adorably with conditions.",

  "Steampunk Inventor - A Victorian scientist adjusts elaborate brass weather machines and goggles in sepia tones. Each day shows new contraptions measuring and reacting to atmospheric changes.",

  "Egyptian Hieroglyphics - Ancient gods and symbols arranged in cartouche-style panels tell weather stories. Ra (sun god) and other deities' prominence changes based on daily conditions.",

  "Minimalist Line Art - A single continuous line forms a person's silhouette that morphs subtly each day. Weather is suggested through the line's thickness, curves, and negative space.",

  "Pop Art Comic Panel - Bold Ben-Day dots and 'BAM!' style text announce weather through a superhero's daily battles. Each condition is a villain or ally the hero must face.",

  "Stained Glass Cathedral - Biblical or mythical figures rendered in luminous colored glass segments react to weather. Light transmission changes with sun, clouds depicted through glass opacity.",

  "Bauhaus Geometric - Primary colored shapes form an abstract figure that reconfigures into weather-appropriate compositions. Circle, square, and triangle arrangements convey conditions through pure form.",

  "Fresco Renaissance - Cherubs and classical figures in cracked plaster style paint scenarios around weather. Michelangelo-inspired muscular forms gesture dramatically at conditions.",

  "Neon Sign Cyberpunk - A glowing figure flickers in electric blues and pinks against dark city nights. Weather affects the neon's brightness, buzzing effects, and reflected puddles.",

  "Pointillism Dots - Thousands of tiny dots form a park-goer whose activities change with weather. Dot colors and density shift to create atmospheric impressions.",

  "Aboriginal Dreamtime - Concentric circles and symbolic patterns tell a walkabout story affected by weather. Traditional dot painting styles show connection between land and sky.",

  "Soviet Propaganda Poster - A heroic worker in constructivist style prepares for weather with determined expression. Bold typography declares weather slogans in red, black, and white.",

  "Impressionist Garden - A Claude Monet-style figure strolls through gardens with loose, visible brushstrokes. Weather affects the color palette and paint application texture.",

  "Art Nouveau Flowing Lines - An elegant figure with flowing hair and organic, curving borders responds to weather. Alphonse Mucha-inspired botanical elements bloom or wilt with conditions.",

  "Cubist Multiple Perspectives - A figure fragmented into geometric planes shows simultaneous weather preparations. Picasso-inspired angular faces show different weather reactions at once.",

  "Charcoal Sketch Study - A life drawing figure in smudged charcoal changes poses for weather-appropriate activities. Cross-hatching and blending techniques create atmospheric mood.",

  "Retro Atari Game Screen - Blocky pixel character navigates simple platformer levels themed to weather. Score and lives change based on forecast difficulty.",

  "Memphis Design 80s Pattern - A radical squiggle-and-shape character jumps through pastel geometric chaos. Weather determines the background pattern density and color combinations.",

  "Botanical Scientific Illustration - Detailed pen-and-ink drawings show a naturalist documenting weather-responsive plants. Each day reveals new specimens in journal-style layouts.",

  "Film Strip Cinema - Individual movie frames show a character's weather story unfolding cinematically. Different genres (western, romance, horror) match weather moods.",

  "Origami Paper Folding - A folded paper figure reconfigures into weather-appropriate forms and accessories. Each day shows different origami complexity and paper patterns.",

  "Chalkboard Teacher Diagram - A stick figure teacher drawn in white chalk explains weather with annotations and arrows. Smudges and chalk dust effects add authenticity.",

  "Tarot Card Mystical - Ornate card borders frame symbolic figures representing weather as fortune readings. Major and minor arcana imagery predicts atmospheric conditions.",

  "Subway Map Schematic - A commuter token navigates colored transit lines representing weather patterns. Station stops and transfers indicate daily condition changes.",

  "Flip Book Animation - Sequential drawings show a character's repeated action morphing with weather across frames. Page curl effects and registration marks add charm.",

  "Magazine Collage Cutout - A figure assembled from clipped magazine pieces changes based on weather. Different publication styles (fashion, news, nature) contribute elements.",

  "Sand Mandala Tibetan - Concentric colored sand patterns form weather deities that shift daily. Intricate geometric precision shows Buddhist weather symbolism.",

  "Holographic Iridescent - A shimmering figure in rainbow metallic gradients shifts perspectives with weather. Chromatic aberration and light refraction effects create futuristic atmosphere.",
];

/**
 * Characters that can appear in the weather panels.
 * Each entry includes the character name and their personality/interests.
 */
export const CHARACTERS: string[] = [
  "Lachlan - A spirited 12-year-old boy with endless energy for sports and competition. Whether he's dribbling a soccer ball down the field or sprinting across the athletics track, he's always chasing his next personal best.",

  "William - An enthusiastic 10-year-old boy who splits his time between the soccer pitch and his favorite anime shows. He often imagines himself as the protagonist of his own action-packed story, complete with special moves inspired by his beloved characters.",

  "Thomas - A creative 7-year-old boy who loves the rush of running as much as the calm of crafting. His room is filled with handmade paper airplanes, painted rocks, and ribbons from local athletics events.",

  "Pepper - A mischievous tabby cat with the instincts of a natural-born hunter. The backyard goldfish pond and visiting birds have learned to fear this stealthy predator who treats every day like a safari.",

  "Evie - A gentle black Labrador with a heart as warm as her dark, glossy coat. She lives for belly rubs, enthusiastic games of fetch, and snuggling up next to anyone who'll share their couch space.",
];

/**
 * Pick a random item from an array.
 */
function pickRandom<T>(array: T[]): T | undefined {
  if (array.length === 0) return undefined;
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Build the prompt for generating a weather infographic.
 */
export function buildWeatherPrompt(weatherData: WeatherData): string {
  const weatherJson = JSON.stringify(weatherData, null, 2);

  // Pick random art style, fallback to default if array is empty
  const artStyle =
    pickRandom(ART_STYLES) ??
    "Marvel comic book style - A superhero character reacts to weather conditions with dramatic poses.";

  // Pick random character, fallback to default if array is empty
  const character = pickRandom(CHARACTERS) ?? "a friendly character";

  return `Create a weather infographic for this week's forecast.

Art Style: ${artStyle}

Character: Feature ${character} as the main character appearing in each panel, adapted to fit the art style.

Layout: A large panel on the left showing today's weather, with smaller follow-up panels for the upcoming days. Create an illustrated narrative flowing through all panels with the character reacting to each day's conditions.

Weather Data:
${weatherJson}`;
}
