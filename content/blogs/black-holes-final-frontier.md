---
title: "Keplar & TESS"
author: "Dee"
publishDate: "2024-02-01"
difficulty: "Advanced"
tags: ["Black Holes","General Relativity","Singularity"]
thumbnailImage: "/images/blogs/1769692976158-star.jpeg"
excerpt: "What happens beyond the event horizon? A deep dive into the physics of singularities and Hawking radiation."
---

What are the Kepler and TESS missions?
Kepler and TESS are NASA space telescopes specifically designed to discover exoplanets using the transit method.
Let me explain each mission in detail:

# The Kepler Mission (2009-2018)
Mission Overview:

Launch: March 2009
End: October 2018 (retired after running out of fuel)
Duration: ~9 years of operation
Primary Mission: Find Earth-sized exoplanets in the habitable zone

How Kepler Worked:
1. Stare-and-Monitor Strategy:

Kepler pointed at one fixed patch of sky in the constellation Cygnus
Continuously monitored ~150,000 stars simultaneously
Rarely moved (except for minor adjustments)

Think of it like: Setting up a camera on a tripod aimed at the same spot for 4 years straight!
2. Observation Period:

Primary mission: 2009-2013 (4 years continuous observation)
K2 mission: 2014-2018 (extended mission with different targets)

3. Sky Coverage:

Observed only ~0.25% of the sky
But observed it VERY deeply and continuously
Perfect for finding planets with long orbital periods

Kepler's Achievements:

Discovered 2,700+ confirmed exoplanets
Found thousands more candidate planets
Proved that planets are common in our galaxy
Discovered many Earth-sized planets
Created the largest exoplanet dataset ever!

Why Kepler Data Is Important for ML:

Massive dataset: 150,000+ light curves
Long baseline: 4 years of continuous data
Well-studied: Many confirmed planets (labeled training data!)
High quality: Very precise photometry
Standard benchmark: Most ML exoplanet papers use Kepler data


The TESS Mission (2018-Present)
Mission Overview:

Launch: April 2018
Status: Still operating! Currently in extended mission
Primary Mission: Find exoplanets around bright, nearby stars
Duration: Originally 2 years, now extended indefinitely

How TESS Works:
1. All-Sky Survey Strategy:

TESS scans nearly the entire sky (85% coverage)
Divides sky into 26 sectors
Observes each sector for ~27 days, then moves to the next
Completes full survey every 2 years, then repeats

Think of it like: A surveillance camera that rotates to cover your entire neighborhood, sector by sector!
2. Target Selection:

Monitors ~200,000 stars per sector
Focuses on bright, nearby stars (easier to follow up with other telescopes)
Total: Millions of stars across the whole sky

3. Sky Coverage:

~85% of the entire sky (compared to Kepler's 0.25%!)
But each star observed for shorter time (27 days vs. Kepler's 4 years)
Poles get continuous coverage (year-long observation)

TESS's Achievements:

Discovered 400+ confirmed exoplanets (and counting!)
Thousands of candidate planets
Found planets around bright stars (easier to study with other instruments)
Excellent for finding short-period planets (hot Jupiters, hot Neptunes)
Still actively discovering new planets!

Why TESS Data Is Important for ML:

Fresh, ongoing data: New light curves constantly being released
Wide coverage: More diverse stellar populations
Bright targets: Found planets can be studied in detail
Complementary to Kepler: Different observing strategy = different biases
Future-focused: TESS data will be used for years to come


Key Differences Between Kepler and TESS (Summary Table)
FeatureKeplerTESSSky Coverage0.25% (one field)85% (nearly all sky)Observation Time4 years continuous27 days per sectorNumber of Stars~150,000Millions (across all sectors)Target StarsFaint, distantBright, nearbyBest For FindingLong-period planetsShort-period planetsStatusRetired (2018)Active (2018-present)Confirmed Planets~2,700~400+ (growing)Data Cadence30 min or 1 min10 min or 2 min

Why These Missions Matter for Your ML Research
1. Training Data Source:
Both missions provide labeled datasets:

Light curves with confirmed exoplanets (positive examples)
Light curves with no planets (negative examples)
Light curves with false positives (to train robustness)

2. Data Format:
Both use similar data formats:

Time series of brightness measurements
Standardized file formats (FITS files)
Accessible through public archives

3. Benchmark Datasets:
Most ML exoplanet research papers use:

Kepler data for training and testing (established benchmark)
TESS data for validation and real-world application

4. Different Challenges:
Your ML model might need to work on both:

Kepler: Longer baselines, different noise characteristics
TESS: Shorter observations, different cadence
Understanding both helps create robust models!


Where to Access This Data
For Your Research:
1. MAST (Mikulski Archive for Space Telescopes):

URL: https://mast.stsci.edu/
Official archive for Kepler and TESS data
Download light curves directly

2. Lightkurve (Python Library):

URL: https://docs.lightkurve.org/
Easy programmatic access to Kepler/TESS data
Perfect for ML pipelines!
Example: lk.search_lightcurve("Kepler-10").download()

3. NASA Exoplanet Archive:

URL: https://exoplanetarchive.ipac.caltech.edu/
Browse confirmed planets
Get labeled training data

4. Kaggle Datasets:

Search "Kepler exoplanet" or "TESS exoplanet"
Pre-processed datasets ready for ML
Good starting point!


Quick Summary
Kepler (2009-2018):

Stared at one patch of sky for 4 years
Found 2,700+ planets
Deep, continuous observations
Your primary training dataset

TESS (2018-present):

Scanning the entire sky
Found 400+ planets (still going!)
Shorter observations per star
Your validation/application dataset

Both missions:

Use the transit method
Provide public light curve data
Are the foundation of exoplanet ML research


Do you understand what Kepler and TESS are—space telescopes that collected the light curve data you'll use for training your ML models?
Key takeaway: These missions are your data sources. Kepler = deep historical dataset, TESS = ongoing wider survey.
Ready for Question 8: The difference between Kepler and TESS data? (This is crucial for data preprocessing in your ML pipeline!)