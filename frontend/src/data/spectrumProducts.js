// Spectrum Cannabis product catalog. ~40 products across 5 categories.
// All prices in P$ (Praya Dollars). Strain types lowercase.
// `accentColor` defaults to category color if omitted at consumer level.

export const SPECTRUM_PRODUCTS = [
  // ---------- FLOWER (12) ----------
  { id: 'northern-lights-eighth', name: 'Northern Lights', category: 'flower', strainType: 'indica', thc: 22, cbd: 0.1, weight: '3.5g', price: 45, terpenes: ['Myrcene', 'Caryophyllene', 'Pinene'], featured: true,
    description: 'A classic indica with a heavy, sedative profile. Earthy and pine-forward, with a sweet finish. Northern Lights is the strain that built modern indoor cultivation — and we still grow it the way it deserves.\n\nBest enjoyed evenings, with the lights low.' },
  { id: 'blue-dream-eighth', name: 'Blue Dream', category: 'flower', strainType: 'hybrid', thc: 21, cbd: 0.2, weight: '3.5g', price: 45, terpenes: ['Myrcene', 'Pinene', 'Caryophyllene'],
    description: 'The sativa-leaning hybrid that needs no introduction. Sweet berry on the nose, balanced cerebral lift, gentle body. A reliable daytime choice for anyone who finds pure sativas too racy.\n\nGrown in our Surowski Valley facility under full-spectrum LED.' },
  { id: 'gelato-33-eighth', name: 'Gelato #33', category: 'flower', strainType: 'hybrid', thc: 24, cbd: 0.1, weight: '3.5g', price: 50,  terpenes: ['Caryophyllene', 'Limonene', 'Humulene'], featured: true,
    description: 'A dessert-strain heavyweight: creamy, citrus-sweet, balanced. Phenotype #33 is the cut we settled on after three growing cycles of evaluation.\n\nEqual parts head and body. Pairs well with a film and a quiet evening.' },
  { id: 'wedding-cake-eighth', name: 'Wedding Cake', category: 'flower', strainType: 'indica', thc: 25, cbd: 0.1, weight: '3.5g', price: 50, terpenes: ['Limonene', 'Caryophyllene', 'Myrcene'],
    description: 'Vanilla-forward, dense buds, heavy trichome cover. The indica end of our hybrid bench.\n\nA strain we lean on when we want sleep without sedation.' },
  { id: 'sour-diesel-gram', name: 'Sour Diesel', category: 'flower', strainType: 'sativa', thc: 23, cbd: 0.1, weight: '1g', price: 15, terpenes: ['Caryophyllene', 'Limonene', 'Myrcene'],
    description: 'The fuel-and-citrus sativa. Energetic, conversational, focus-friendly.\n\nCured slow, packed loose. A 1g jar to try without committing to an eighth.' },
  { id: 'green-crack-eighth', name: 'Green Crack', category: 'flower', strainType: 'sativa', thc: 22, cbd: 0.1, weight: '3.5g', price: 42, terpenes: ['Myrcene', 'Caryophyllene', 'Limonene'],
    description: 'A renamed classic — daytime sativa, mango on the nose, clean upbeat profile.\n\nWe call it Green Crack out of respect for the strain\'s history; the name carries the lineage.' },
  { id: 'gsc-eighth', name: 'Girl Scout Cookies', category: 'flower', strainType: 'hybrid', thc: 24, cbd: 0.1, weight: '3.5g', price: 48, terpenes: ['Caryophyllene', 'Limonene', 'Humulene'],
    description: 'Sweet, earthy, full-bodied. The grandparent of half the modern hybrid catalog.\n\nGrown from cuttings traceable to the original Bay Area cut.' },
  { id: 'og-kush-quarter', name: 'OG Kush', category: 'flower', strainType: 'indica', thc: 23, cbd: 0.2, weight: '7g', price: 85, terpenes: ['Myrcene', 'Limonene', 'Caryophyllene'], featured: true,
    description: 'The OG. Lemon, fuel, pine. Heavy body, focused head.\n\nA quarter for the dedicated. Stored in a sealed glass jar with humidity pack.' },
  { id: 'ak47-quarter', name: 'AK-47', category: 'flower', strainType: 'sativa', thc: 22, cbd: 0.2, weight: '7g', price: 80, terpenes: ['Myrcene', 'Caryophyllene', 'Pinene'],
    description: 'A long-running sativa with a balanced, social profile. Earthy, slightly skunky.\n\nNot as aggressive as the name suggests — closer to a steady hum than a sprint.' },
  { id: 'pineapple-express-eighth', name: 'Pineapple Express', category: 'flower', strainType: 'hybrid', thc: 21, cbd: 0.1, weight: '3.5g', price: 44, terpenes: ['Limonene', 'Caryophyllene', 'Pinene'],
    description: 'Tropical, citrus, a touch of pine. Hybrid that leans sativa.\n\nDaytime to early-evening choice.' },
  { id: 'jack-herer-half', name: 'Jack Herer', category: 'flower', strainType: 'sativa', thc: 22, cbd: 0.2, weight: '14g', price: 155, terpenes: ['Pinene', 'Terpinolene', 'Caryophyllene'],
    description: 'Pine, spice, focus. A sativa we keep in stock because customers keep asking for it.\n\nHalf-ounce for regulars; sealed glass jar.' },
  { id: 'do-si-dos-eighth', name: 'Do-Si-Dos', category: 'flower', strainType: 'indica', thc: 26, cbd: 0.1, weight: '3.5g', price: 52, terpenes: ['Limonene', 'Caryophyllene', 'Myrcene'],
    description: 'Dense, sweet, sedative. The strain we recommend for serious sleep nights.\n\nOne of our higher-THC offerings.' },

  // ---------- PRE-ROLLS (8) ----------
  { id: 'house-prerolls-5pack', name: 'House Pre-Rolls (5-pack)', category: 'pre-rolls', strainType: 'hybrid', thc: 20, cbd: 0.1, weight: '5 × 0.5g', price: 35, terpenes: ['Caryophyllene', 'Myrcene', 'Limonene'], featured: true,
    description: 'Five 0.5g pre-rolls of our house hybrid blend. Convenient, consistent, never shake-only.\n\nGreat for sharing or keeping on hand.' },
  { id: 'blue-dream-preroll', name: 'Blue Dream Pre-Roll', category: 'pre-rolls', strainType: 'hybrid', thc: 21, cbd: 0.2, weight: '1g', price: 12, terpenes: ['Myrcene', 'Pinene', 'Caryophyllene'],
    description: 'Single 1g pre-roll, Blue Dream flower, hand-rolled in unbleached paper.\n\nNo trim, no shake — flower only.' },
  { id: 'og-kush-preroll', name: 'OG Kush Pre-Roll', category: 'pre-rolls', strainType: 'indica', thc: 23, cbd: 0.2, weight: '1g', price: 14, terpenes: ['Myrcene', 'Limonene', 'Caryophyllene'],
    description: 'Single 1g OG Kush pre-roll. Hand-rolled, glass tip.\n\nFor when you want the strain without the prep.' },
  { id: 'sativa-trio-3pack', name: 'Sativa Trio (3-pack)', category: 'pre-rolls', strainType: 'sativa', thc: 22, cbd: 0.1, weight: '3 × 0.7g', price: 28, terpenes: ['Pinene', 'Limonene', 'Terpinolene'],
    description: 'Three 0.7g pre-rolls — Sour Diesel, Jack Herer, Green Crack. A daytime sampler.\n\nEach roll labeled by strain.' },
  { id: 'indica-trio-3pack', name: 'Indica Trio (3-pack)', category: 'pre-rolls', strainType: 'indica', thc: 24, cbd: 0.1, weight: '3 × 0.7g', price: 28, terpenes: ['Myrcene', 'Caryophyllene', 'Limonene'],
    description: 'Three 0.7g pre-rolls — Northern Lights, Wedding Cake, Do-Si-Dos. Evening focus.\n\nEach roll labeled by strain.' },
  { id: 'infused-preroll-single', name: 'Infused Pre-Roll (single)', category: 'pre-rolls', strainType: 'hybrid', thc: 35, cbd: 0.1, weight: '1g', price: 22, terpenes: ['Caryophyllene', 'Limonene', 'Myrcene'],
    description: 'Hybrid flower coated in distillate and rolled in kief. High potency.\n\nStart with a quarter of one. Not a beginner product.' },
  { id: 'gsc-preroll', name: 'Girl Scout Cookies Pre-Roll', category: 'pre-rolls', strainType: 'hybrid', thc: 24, cbd: 0.1, weight: '1g', price: 14, terpenes: ['Caryophyllene', 'Limonene', 'Humulene'],
    description: 'Single 1g GSC pre-roll, hand-rolled.\n\nClassic hybrid in single-serving form.' },
  { id: 'mini-prerolls-10pack', name: 'Mini Pre-Rolls (10-pack)', category: 'pre-rolls', strainType: 'hybrid', thc: 20, cbd: 0.1, weight: '10 × 0.3g', price: 38, terpenes: ['Myrcene', 'Caryophyllene', 'Limonene'],
    description: 'Ten 0.3g mini pre-rolls of the house hybrid. Microdose-friendly format.\n\nFor people who prefer more sessions, smaller doses.' },

  // ---------- EDIBLES (10) ----------
  { id: 'gummies-sativa-10mg', name: 'Sativa Gummies (10 × 10mg)', category: 'edibles', strainType: 'sativa', thc: 100, cbd: 0, weight: '10 pcs', price: 24, terpenes: ['Limonene', 'Pinene', 'Terpinolene'], featured: true,
    description: 'Ten 10mg THC sativa-extract gummies. Mixed citrus flavors. Vegan, gelatin-free.\n\nOnset 45–90 minutes. Start with one.' },
  { id: 'gummies-indica-10mg', name: 'Indica Gummies (10 × 10mg)', category: 'edibles', strainType: 'indica', thc: 100, cbd: 0, weight: '10 pcs', price: 24, terpenes: ['Myrcene', 'Caryophyllene', 'Humulene'],
    description: 'Ten 10mg THC indica-extract gummies. Mixed berry flavors. Vegan, gelatin-free.\n\nOnset 45–90 minutes. Start with one.' },
  { id: 'gummies-hybrid-5mg', name: 'Hybrid Gummies (20 × 5mg)', category: 'edibles', strainType: 'hybrid', thc: 100, cbd: 0, weight: '20 pcs', price: 28, terpenes: ['Limonene', 'Caryophyllene', 'Myrcene'],
    description: 'Twenty 5mg hybrid-extract gummies. Microdose-friendly. Mixed tropical flavors. Vegan.\n\nGood entry point for new edible users.' },
  { id: 'chocolate-bar-100mg', name: 'Dark Chocolate Bar (100mg)', category: 'edibles', strainType: 'hybrid', thc: 100, cbd: 0, weight: '40g', price: 22, terpenes: ['Caryophyllene', 'Limonene', 'Myrcene'],
    description: '70% dark chocolate, ten 10mg squares. Made with single-origin Praya cacao.\n\nSnap a square, wait an hour.' },
  { id: 'chocolate-bar-cbd', name: 'Milk Chocolate Bar (1:1 CBD)', category: 'edibles', strainType: 'hybrid', thc: 50, cbd: 50, weight: '40g', price: 26, terpenes: ['Limonene', 'Caryophyllene', 'Pinene'],
    description: 'Ten 5mg-THC, 5mg-CBD squares. Milder cerebral profile, calmer body.\n\nA crowd favorite for social-use evenings.' },
  { id: 'mints-pack', name: 'Sativa Mints (10 × 5mg)', category: 'edibles', strainType: 'sativa', thc: 50, cbd: 0, weight: '10 pcs', price: 18, terpenes: ['Limonene', 'Pinene'],
    description: 'Ten 5mg THC mints in a pocket tin. Discreet, fast-onset (15–30 min via sublingual route).\n\nGood travel companion.' },
  { id: 'sparkling-drink-10mg', name: 'Sparkling Drink — Yuzu (10mg)', category: 'edibles', strainType: 'sativa', thc: 10, cbd: 0, weight: '355ml', price: 12, terpenes: ['Limonene', 'Pinene'],
    description: 'Sparkling yuzu drink with 10mg THC. Fast-onset (nano-emulsified, ~15 min).\n\nOne can, one session. No alcohol.' },
  { id: 'cbd-tincture', name: 'CBD Tincture (1500mg)', category: 'edibles', strainType: null, thc: 0, cbd: 1500, weight: '30ml', price: 65, terpenes: [],
    description: 'Full-spectrum CBD tincture, 1500mg total, 50mg per ml. MCT oil base, mint flavor.\n\nDosing dropper included. No psychoactive effect.' },
  { id: 'cookies-pack', name: 'Salted Caramel Cookies (4 × 25mg)', category: 'edibles', strainType: 'indica', thc: 100, cbd: 0, weight: '4 pcs', price: 26, terpenes: ['Caryophyllene', 'Myrcene'],
    description: 'Four salted caramel cookies, 25mg THC each. Indica-extract.\n\nA stronger evening edible. Half a cookie is plenty for many.' },
  { id: 'gummies-cbd', name: 'CBD-Only Gummies (20 × 25mg)', category: 'edibles', strainType: null, thc: 0, cbd: 500, weight: '20 pcs', price: 32, terpenes: [],
    description: 'Twenty 25mg CBD gummies. No THC. Mixed flavors.\n\nFor calm without the high.' },

  // ---------- VAPES (6) ----------
  { id: 'cart-blue-dream', name: 'Blue Dream Cart (510-thread)', category: 'vapes', strainType: 'hybrid', thc: 85, cbd: 0.5, weight: '1g', price: 50, terpenes: ['Myrcene', 'Pinene', 'Caryophyllene'], featured: true,
    description: '1g 510-thread cartridge, distillate + reintroduced terpenes from the source strain.\n\nFits any standard 510 battery.' },
  { id: 'cart-northern-lights', name: 'Northern Lights Cart (510-thread)', category: 'vapes', strainType: 'indica', thc: 85, cbd: 0.5, weight: '1g', price: 50, terpenes: ['Myrcene', 'Caryophyllene', 'Pinene'],
    description: '1g 510-thread cartridge. Indica-leaning, evening profile.\n\nFits any standard 510 battery.' },
  { id: 'cart-jack-herer', name: 'Jack Herer Cart (510-thread)', category: 'vapes', strainType: 'sativa', thc: 85, cbd: 0.5, weight: '1g', price: 50, terpenes: ['Pinene', 'Terpinolene', 'Caryophyllene'],
    description: '1g 510-thread cartridge. Sativa, focus-leaning.\n\nFits any standard 510 battery.' },
  { id: 'disposable-gelato', name: 'Gelato Disposable', category: 'vapes', strainType: 'hybrid', thc: 80, cbd: 0.5, weight: '1g', price: 38, terpenes: ['Caryophyllene', 'Limonene', 'Humulene'],
    description: 'All-in-one disposable, 1g, USB-C rechargeable. Gelato hybrid profile.\n\nNo battery required.' },
  { id: 'disposable-og-kush', name: 'OG Kush Disposable', category: 'vapes', strainType: 'indica', thc: 80, cbd: 0.5, weight: '1g', price: 38, terpenes: ['Myrcene', 'Limonene', 'Caryophyllene'],
    description: 'All-in-one disposable, 1g, USB-C rechargeable. OG Kush indica profile.\n\nNo battery required.' },
  { id: 'live-resin-cart', name: 'Live Resin Cart — Wedding Cake', category: 'vapes', strainType: 'indica', thc: 78, cbd: 0.4, weight: '0.5g', price: 55, terpenes: ['Limonene', 'Caryophyllene', 'Myrcene'],
    description: 'Live resin cartridge, 0.5g. Cold-extracted from fresh-frozen flower — fuller terpene profile than distillate.\n\n510-thread.' },

  // ---------- ACCESSORIES (4) ----------
  { id: 'rolling-papers', name: 'Spectrum Rolling Papers (1¼)', category: 'accessories', strainType: null, thc: 0, cbd: 0, weight: 'Pack of 50', price: 5, terpenes: [],
    description: '1¼ size, unbleached natural fiber rolling papers. 50 leaves per pack.\n\nThin, slow-burning. Branded with the rainbow bar.' },
  { id: 'grinder-2pc', name: 'Spectrum Grinder (2-piece)', category: 'accessories', strainType: null, thc: 0, cbd: 0, weight: '55mm', price: 32, terpenes: [],
    description: 'Anodized aluminum 2-piece grinder, 55mm. Diamond-cut teeth.\n\nLifetime warranty. Engraved with the rainbow bar.' },
  { id: 'storage-jar', name: 'UV-Resistant Storage Jar', category: 'accessories', strainType: null, thc: 0, cbd: 0, weight: '120ml', price: 18, terpenes: [],
    description: 'UV-resistant amber glass jar, 120ml, airtight seal. Holds approximately a half-ounce.\n\nIncludes humidity pack.' },
  { id: 'lighter-zippo', name: 'Spectrum Brass Lighter', category: 'accessories', strainType: null, thc: 0, cbd: 0, weight: '1 unit', price: 28, terpenes: [],
    description: 'Refillable brass lighter, windproof flame. Engraved rainbow bar on the side.\n\nButane refills sold separately at any of our locations.' }
]

export const SPECTRUM_CATEGORIES = [
  { id: 'flower', label: 'Flower', accentColor: '#5E7C16' },
  { id: 'pre-rolls', label: 'Pre-Rolls', accentColor: '#F9801D' },
  { id: 'edibles', label: 'Edibles', accentColor: '#8932B8' },
  { id: 'vapes', label: 'Vapes', accentColor: '#3AB3DA' },
  { id: 'accessories', label: 'Accessories', accentColor: '#1A1A1A' }
]

export const SPECTRUM_STRAIN_TYPES = [
  { id: 'indica', label: 'Indica', color: '#8932B8' },
  { id: 'sativa', label: 'Sativa', color: '#5E7C16' },
  { id: 'hybrid', label: 'Hybrid', color: '#F9801D' },
  { id: null, label: 'N/A', color: '#6B7280' }
]
