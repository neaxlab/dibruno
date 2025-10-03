const faqs = [
  {
    "question": "What makes DiBruno products unique?",
    "answer": "Step into a world where nature meets science! DiBruno blends potent actives like Procapil, Apiscalp, Medilan, Lumiskyn, and Silverfree with lush botanicals, creating hypoallergenic, eco-friendly treasures for sensitive scalps and skin. From tackling hair loss with our premium 5% Procapil line to offering gentle 3% 'Lite' options, every recyclable bottle brims with sustainability and care—your hair and skin deserve this natural glow-up!",
    "category": "General"
  },
  {
    "question": "Are DiBruno products suitable for all hair and skin types?",
    "answer": "Absolutely, we’ve got everyone covered! Whether your scalp’s oily, dry, or sensitive, or your skin’s craving relief, DiBruno’s gentle formulas—like our hair-strengthening serums or psoriasis-soothing creams—work wonders for all. Fancy a patch test if allergies are a concern, and chat with a dermatologist for tricky cases. Our hypoallergenic magic is tested to embrace every unique you!",
    "category": "General"
  },
  {
    "question": "Are your products cruelty-free and vegan?",
    "answer": "You bet we’re cruelty-free—no animals harmed here! Most of our lineup, like shampoos and mists, shines with vegan pride using plant-powered actives. But SkinBalm Cream and SkinSoothe Lotion feature Medilan (ethical lanolin), so they’re not vegan—yet we’re exploring greener swaps. Peek at the labels to find your perfect match!",
    "category": "General"
  },
  {
    "question": "How should I store DiBruno products?",
    "answer": "Treat your DiBruno goodies like VIPs! Tuck them away in a cool, dry spot, shielded from sunlight, and keep lids snug to lock in that fresh potency—especially for serums and mists. Skip the steamy bathroom, and use within 24 months unopened or 12-18 months after opening (check the label’s symbol!). Proper care keeps the natural magic alive!",
    "category": "General"
  },
  {
    "question": "Where are your ingredients sourced from?",
    "answer": "We journey globally for the best! Procapil hails from Sederma’s biotech labs, Apiscalp blooms from celery seeds, and Medilan is ultra-refined lanolin from ethical wool. Lumiskyn is pure-synthesized goodness. Our partners meet EU/US standards with no animal testing—dive into our About page to see our eco-adventure unfold!",
    "category": "General"
  },
  {
    "question": "How does RootPure Shampoo help with hair loss?",
    "answer": "Say hello to thicker, happier hair with RootPure Shampoo! Packed with 5% Procapil, it’s a scalp-cleansing superhero that fights DHT, anchors roots, and boosts circulation—reducing hair loss by up to 68% in studies! Massage daily, pair with RootFlourish Mask, and watch your strands thrive. For a lighter touch, try RootLite Shampoo’s 3% Procapil!",
    "category": "Product-Specific"
  },
  {
    "question": "What’s the difference between RootFlourish Mask and NurtureLite Mask?",
    "answer": "Get ready for a hair transformation duo! RootFlourish Mask (5% Procapil) is your intensive weekly treat, deeply nourishing follicles for lush growth—perfect for tackling hair loss head-on. NurtureLite Mask (3% Procapil) is your gentle daily hug, ideal for maintenance with a lighter formula. Both rock 8 fl oz bottles, but RootFlourish packs a punch, while NurtureLite keeps it easy!",
    "category": "Product-Specific"
  },
  {
    "question": "How often should I use SproutMist Spray?",
    "answer": "Spritz your way to regrowth with SproutMist Spray (5% Procapil) daily! Spray evenly on your scalp, massage, and let it work its non-greasy magic—no rinsing needed. Pair with RootFlourish Mask for a powerhouse combo. Studies show a 46% anagen hair boost in 4 months—amazing, right? Try ReviveLite Mist Spray (3%) for a gentler daily lift!",
    "category": "Product-Specific"
  },
  {
    "question": "Can ReviveLite Mist Spray replace my regular conditioner?",
    "answer": "ReviveLite Mist Spray (3% Procapil) is your hair’s new best friend, but it’s not a conditioner! This leave-in marvel revitalizes thinning hair and strengthens follicles daily—think of it as a boost, not a swap. Use with your shampoo, and add NurtureLite Mask for extra love. Procapil’s circulation magic keeps it unique!",
    "category": "Product-Specific"
  },
  {
    "question": "How does ScalpCalm Shampoo help with psoriasis?",
    "answer": "Wave goodbye to scalp woes with ScalpCalm Shampoo (3% Apiscalp)! This gentle hero soothes irritation, tames flaking, and restores comfort for psoriasis-prone scalps. Massage daily, and pair with ScalpSoothe Serum for a soothing boost. Studies show an 80% itch reduction in 3 weeks—your scalp will thank you!",
    "category": "Product-Specific"
  },
  {
    "question": "Is SkinBalm Cream safe for daily use on sensitive skin?",
    "answer": "Oh yes, SkinBalm Cream (1% Medilan) is your sensitive skin’s new BFF! This rich treat soothes psoriasis with ultra-refined lanolin, repairing your barrier and hydrating like a dream—35% faster healing than natural lipids! Slather it on twice daily, and team with SkinSoothe Lotion for a silky shield. Pure comfort awaits!",
    "category": "Product-Specific"
  },
  {
    "question": "How does ClearBalance Shampoo control oily hair?",
    "answer": "Tame that oily scalp with ClearBalance Shampoo (3% Apiscalp)! This gentle cleanser regulates sebum, clarifies without drying, and leaves hair fresh and vibrant. Use daily, and pair with LightMist Spray for a shine-free finish. Research highlights a 43% hydration boost—say hello to balanced locks!",
    "category": "Product-Specific"
  },
  {
    "question": "What results can I expect from SpotGlow Mist?",
    "answer": "Unveil radiant skin with SpotGlow Mist (2% Lumiskyn)! This light mist fades dark spots by curbing melanin, promising a 40% reduction in hyperpigmentation. Spritz twice daily for 4-8 weeks, and pair with SkinSoothe Lotion for a hydrated glow. Studies confirm brighter skin—get ready to shine!",
    "category": "Product-Specific"
  },
  {
    "question": "How does ColorVive Mist restore hair color?",
    "answer": "Bring back your hair’s youthful vibe with ColorVive Mist (Silverfree)! This magic mist reduces white hair by up to 86% and revives natural hues by waking up melanocytes. Spray daily for 3 months, and team with RootPure Shampoo for vitality. Studies show a 32.4% reduction in 4 months—hello, vibrant you!",
    "category": "Product-Specific"
  },
  {
    "question": "What is Procapil, and why is it in your products?",
    "answer": "Procapil is your hair’s secret weapon—a blend of biotinoyl tripeptide-1, apigenin, and oleanolic acid that battles hair loss by blocking DHT and boosting circulation! At 5% (e.g., RootPure Shampoo), it’s intensive; at 3% (Lite line), it’s daily-friendly. Studies boast a 68% hair loss drop and 46% anagen boost—pretty incredible, right?",
    "category": "Ingredient & Safety"
  },
  {
    "question": "Is Apiscalp safe for sensitive scalps?",
    "answer": "Absolutely, Apiscalp (celery seed magic) at 3% is a sensitive scalp’s best friend! It slashes itching by 80% and lifts hydration by 43% in 3 weeks—perfect for psoriasis or oily scalps. Gentle yet powerful!",
    "category": "Ingredient & Safety"
  },
  {
    "question": "What are the emollients in SkinBalm Cream?",
    "answer": "SkinBalm Cream is a luxurious blend with 1% Medilan (lanolin) for barrier repair, plus 5% Crodafos CES, 2% Crodamol STS, and 10% Arlamol PS15E for silky hydration—35% faster healing for psoriasis! It’s a soothing masterpiece!",
    "category": "Ingredient & Safety"
  },
  {
    "question": "Are there any side effects to watch for?",
    "answer": "Our hypoallergenic heroes are super safe, but if redness pops up, take a break. Avoid eyes, and chat with a doctor if allergies are a worry—your comfort is our priority!",
    "category": "Ingredient & Safety"
  },
  {
    "question": "How long do your products last once opened?",
    "answer": "Your DiBruno treasures last 12-18 months post-opening with proper care! Serums like VitaLush might say 12M, while shampoos like RootPure can stretch to 24M—check the label’s symbol and store them right!",
    "category": "Ingredient & Safety"
  },
  {
    "question": "How long until I see results from DiBruno products?",
    "answer": "Patience pays off! Hair heroes like VitaLush Serum dazzle in 8-12 weeks, while skin saviors like SpotGlow Mist glow in 4-8 weeks. Stick with daily use, and watch the magic unfold!",
    "category": "Usage & Purchase"
  },
  {
    "question": "Can I use multiple DiBruno products together?",
    "answer": "Oh yes, mix and match for a custom glow-up! Try RootPure Shampoo with RootFlourish Mask, or ScalpCalm Shampoo with ScalpSoothe Serum. Follow instructions for the perfect pairing—your hair and skin will love it!",
    "category": "Usage & Purchase"
  },
  {
    "question": "Where can I buy DiBruno products?",
    "answer": "Head to www.dibrunolab.com for the full DiBruno experience—secure shopping awaits! We’re gearing up to hit select retailers soon, so stay tuned for more ways to grab your favorites!",
    "category": "Usage & Purchase"
  },
  {
    "question": "What’s your return policy?",
    "answer": "Love it or swap it! Our 30-day satisfaction guarantee lets you return with ease—just email Support@DiBrunoLab.com with your order details. Check www.dibrunolab.com for the full scoop!",
    "category": "Usage & Purchase"
  },
  {
    "question": "How much do DiBruno products cost?",
    "answer": "Pricing’s as unique as you are! Visit www.dibrunolab.com for the latest—our Lite line offers budget-friendly vibes, while premium picks deliver luxe care. Snag bundle deals for extra savings!",
    "category": "Usage & Purchase"
  },
  {
    "question": "What are your shipping options and costs?",
    "answer": "We’ve got you covered with standard and express U.S. shipping! Costs vary by order and location—peek at www.dibrunolab.com checkout for details. Score free shipping on $100+ orders, subject to change!",
    "category": "Usage & Purchase"
  }
]

const categories = [
    "All",
    "General",
    "Product-Specific",
    "Ingredient & Safety",
    "Usage & Purchase",
]

export { faqs, categories };
